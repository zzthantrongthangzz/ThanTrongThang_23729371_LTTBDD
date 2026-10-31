import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props { value: PriceRange; onChange: (v: PriceRange) => void; }

export function PriceFilter({ value, onChange }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {PRICE_RANGES.map((range) => {
        const active = value === range.key;
        return (
          <Pressable key={range.key} style={[styles.btn, active && styles.btnActive]} onPress={() => onChange(active ? null : range.key)}>
            <Text style={[styles.text, active && styles.textActive]}>{range.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingBottom: 10, gap: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.cyan, backgroundColor: "#fff" },
  btnActive: { backgroundColor: colors.cyan },
  text: { color: colors.cyan, fontWeight: "700", fontSize: 12 },
  textActive: { color: "#fff" },
});
