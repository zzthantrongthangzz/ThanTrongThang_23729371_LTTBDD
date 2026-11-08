import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;
const ORDER_FILTERS: { value: "all" | OrderStatus; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã huỷ" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const load = useCallback(async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  const reorder = async (order: Order) => {
    if (reorderingId !== null) return;
    setReorderingId(order.id);
    try {
      const books = await getBooks();
      let addedCount = 0;

      order.items.forEach((item) => {
        const book = books.find((candidate) => candidate.id === item.bookId);
        if (!book || book.stock < 1) return;

        const inCart = cartItems.find((cartItem) => cartItem.bookId === item.bookId);
        if (!inCart) {
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          });
        }
        setQty(item.bookId, (inCart?.quantity ?? 0) + item.quantity);
        addedCount += 1;
      });

      if (addedCount) {
        showMessage("Đã thêm vào giỏ", "Các sản phẩm còn hàng đã được thêm lại vào giỏ.", () =>
          navigation.navigate("Tabs", { screen: "Cart" }));
      } else {
        showMessage("Không thể mua lại", "Các sản phẩm trong đơn hiện không còn hàng.");
      }
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    } finally {
      setReorderingId(null);
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  const filteredOrders = orders.filter((order) => statusFilter === "all" || order.status === statusFilter);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredOrders}
        keyExtractor={(order) => String(order.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={(
          <View style={styles.filters}>
            {ORDER_FILTERS.map((filter) => {
              const selected = statusFilter === filter.value;
              return (
                <Pressable
                  key={filter.value}
                  onPress={() => setStatusFilter(filter.value)}
                  style={[styles.filterChip, selected && styles.filterChipSelected]}
                >
                  <Text style={[styles.filterText, selected && styles.filterTextSelected]}>{filter.label}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
        ListEmptyComponent={
          orders.length === 0 ? (
            <EmptyState
              emoji="🧾"
              title="Bạn chưa có đơn hàng nào"
              message="Đặt đơn đầu tiên để theo dõi tại đây."
              actionLabel="Mua sắm ngay"
              onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
            />
          ) : <EmptyState emoji="🔎" title="Không có đơn hàng ở trạng thái này" />
        }
        renderItem={({ item: order }) => {
          const open = openId === order.id;
          return (
            <View style={styles.card}>
              <Pressable onPress={() => setOpenId(open ? null : order.id)} style={styles.head}>
                <View style={styles.summary}>
                  <Text style={styles.code}>Đơn #{order.id}</Text>
                  <Text style={styles.date}>{formatDateTime(order.createdAt)}</Text>
                  <Text style={styles.total}>{formatPrice(order.total)}</Text>
                </View>
                <View style={styles.status}>
                  <StatusBadge status={order.status} />
                  <Text style={styles.toggle}>{open ? "Thu gọn ▲" : "Chi tiết ▼"}</Text>
                </View>
              </Pressable>
              {open ? (
                <View style={styles.detail}>
                  {order.items.map((item) => (
                    <View key={item.bookId} style={styles.itemRow}>
                      <Text style={styles.itemTitle} numberOfLines={1}>{item.title} × {item.quantity}</Text>
                      <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
                    </View>
                  ))}
                  <View style={styles.address}>
                    <Text style={styles.addressHeading}>Giao đến</Text>
                    <Text style={styles.addressText}>{order.address.name} · {order.address.phone}</Text>
                    <Text style={styles.addressText}>{order.address.address}</Text>
                    <Text style={styles.addressText}>Thanh toán: {PAYMENT_LABEL[order.paymentMethod]}</Text>
                  </View>
                  {order.status === "completed" ? (
                    <PrimaryButton
                      title="Mua lại"
                      variant="outline"
                      onPress={() => reorder(order)}
                      loading={reorderingId === order.id}
                      disabled={reorderingId !== null && reorderingId !== order.id}
                    />
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 12, gap: 10, flexGrow: 1 },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingBottom: 2 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  filterChipSelected: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  filterText: { color: colors.text, fontSize: 12, fontWeight: "700" },
  filterTextSelected: { color: "#fff" },
  card: { backgroundColor: "#fff", borderRadius: radius.md, padding: 12 },
  head: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  summary: { flex: 1, gap: 3 },
  code: { fontSize: 16, fontWeight: "800", color: colors.navy },
  date: { fontSize: 12, color: colors.muted },
  total: { marginTop: 2, fontSize: 15, fontWeight: "800", color: colors.indigo },
  status: { alignItems: "flex-end", gap: 8 },
  toggle: { color: colors.indigo, fontSize: 12, fontWeight: "700" },
  detail: { borderTopWidth: 1, borderTopColor: colors.line, marginTop: 12, paddingTop: 10, gap: 10 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { color: colors.text, fontWeight: "700" },
  address: { backgroundColor: colors.bg, borderRadius: radius.sm, padding: 10, gap: 3 },
  addressHeading: { color: colors.navy, fontWeight: "800" },
  addressText: { color: colors.text, fontSize: 13 },
});
