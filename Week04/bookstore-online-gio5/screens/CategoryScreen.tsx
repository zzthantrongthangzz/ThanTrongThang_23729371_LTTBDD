import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CategoryChips } from '../components/CategoryChips';

export function CategoryScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Khám phá Danh mục</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CategoryChips />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Chừa khoảng trống cho TabBar
  }
});