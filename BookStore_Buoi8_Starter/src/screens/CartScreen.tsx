import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";

import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const { isLoggedIn } = useAuth();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState(false);
  const discount = useMemo(() => appliedCoupon === "SALE10" ? Math.round(totalPrice * 0.1) : appliedCoupon === "GIAM50K" ? Math.min(totalPrice, 50000) : 0, [appliedCoupon, totalPrice]);
  const finalTotal = Math.max(0, totalPrice - discount);

  // Confirmation works on both native and web through the shared dialog helper.
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    if (!item) return;
    confirmDialog("Xác nhận xóa", `Xóa ${item.title} khỏi giỏ hàng?`, () => remove(bookId));
  };

  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
  };

  const applyCoupon = () => {
    const normalized = coupon.trim().toUpperCase();
    if (normalized === "SALE10" || normalized === "GIAM50K") {
      setAppliedCoupon(normalized);
      setCoupon(normalized);
      setCouponError(false);
    } else {
      setAppliedCoupon(null);
      setCouponError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn vài cuốn sách yêu thích nhé." actionLabel="Khám phá sách" onAction={() => navigation.navigate("Home")} />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.couponRow}>
            <TextInput value={coupon} onChangeText={(v) => { setCoupon(v); setCouponError(false); }} placeholder="Mã giảm giá (SALE10)" autoCapitalize="characters" style={styles.couponInput} accessibilityLabel="Mã giảm giá" />
            <Pressable onPress={applyCoupon} style={styles.applyButton}><Text style={styles.applyText}>Áp dụng</Text></Pressable>
          </View>
          {appliedCoupon ? <Text style={styles.couponSuccess}>Đã áp dụng {appliedCoupon}: Giảm {appliedCoupon === "SALE10" ? "10%" : "50.000 đ"}</Text> : null}
          {couponError ? <Text style={styles.couponError}>Mã giảm giá không hợp lệ</Text> : null}
          <View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>
          {discount > 0 && <View style={styles.line}><Text style={styles.muted}>Giảm giá</Text><Text style={styles.couponSuccess}>−{formatPrice(discount)}</Text></View>}
          <View style={styles.line}><Text style={styles.total}>Tổng cộng</Text><Text style={styles.total}>{formatPrice(finalTotal)}</Text></View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  couponRow: { flexDirection: "row", gap: 8 },
  couponInput: { flex: 1, borderWidth: 1, borderColor: colors.line, borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8, color: colors.text, backgroundColor: colors.bg },
  applyButton: { backgroundColor: colors.navy, borderRadius: 9, paddingHorizontal: 13, justifyContent: "center" },
  applyText: { color: "#fff", fontWeight: "700" },
  couponSuccess: { color: colors.success, fontSize: 12, fontWeight: "600" },
  couponError: { color: colors.danger, fontSize: 12 },
});
