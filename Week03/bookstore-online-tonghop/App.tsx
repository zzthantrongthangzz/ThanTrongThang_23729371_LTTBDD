import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. Nội dung có thể cuộn */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>
          Danh mục sách
        </Text>

        <CategoryChips />

        <Text style={styles.sectionTitle}>
          Sách nổi bật
        </Text>

        <BookGrid
          books={BOOKS}
          onPressBook={(id) => {
            console.log("Book selected:", id);
          }}
        />
      </ScrollView>

      {/* 3. Nút giỏ nổi ngoài ScrollView */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => {
          setCartCount((count) => count + 1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 12,
  },
});