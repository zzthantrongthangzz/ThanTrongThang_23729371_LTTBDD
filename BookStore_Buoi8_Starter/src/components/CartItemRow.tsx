import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);
  useEffect(() => setQty(item.quantity), [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;
  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}><Text style={styles.emoji}>{item.emoji}</Text></View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.stock}>Còn {item.stock}</Text>
        <View style={styles.stepper}>
          <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))} disabled={!canDec} accessibilityRole="button" accessibilityLabel="Giảm" style={[styles.stepButton, !canDec && styles.disabled]}><Text style={styles.stepText}>−</Text></Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable onPress={() => setQty((q) => Math.min(item.stock, q + 1))} disabled={!canInc} accessibilityRole="button" accessibilityLabel="Tăng" style={[styles.stepButton, !canInc && styles.disabled]}><Text style={styles.stepText}>+</Text></Pressable>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityRole="button" accessibilityLabel="Xóa khỏi giỏ"><Text style={styles.trash}>🗑️</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stock: { color: colors.muted, fontSize: 11 },
  stepper: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 10, marginTop: 3 },
  stepButton: { width: 26, height: 26, borderRadius: 7, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  disabled: { opacity: 0.35 },
  stepText: { color: colors.indigo, fontSize: 18, fontWeight: "700", lineHeight: 22 },
  qty: { minWidth: 16, textAlign: "center", fontWeight: "800", color: colors.navy },
  trash: { fontSize: 22 },
});
