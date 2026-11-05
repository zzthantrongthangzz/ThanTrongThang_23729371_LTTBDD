import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
}

export function RatingStars({ value, size = 18, onChange }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <View style={styles.row}>
      {stars.map((n) => {
        const star = <Text style={{ fontSize: size, lineHeight: size * 1.25, color: n <= Math.round(value) ? colors.warning : colors.line }}>★</Text>;
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} accessibilityRole="button" accessibilityLabel={`${n} sao`} hitSlop={4}>{star}</Pressable>
        ) : <View key={n}>{star}</View>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: "row", alignItems: "center" } });
