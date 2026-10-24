import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../theme";
export function Stars({ value }: { value: number }) {
  const count = Math.max(0, Math.min(5, Math.round(value)));
  return <Text style={styles.stars}>{"★".repeat(count)}{"☆".repeat(5 - count)}</Text>;
}
const styles = StyleSheet.create({ stars: { color: colors.star, fontSize: 19, letterSpacing: 1 } });
