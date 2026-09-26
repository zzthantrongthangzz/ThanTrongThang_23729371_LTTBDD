// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Minh hoạ riêng: Bài 1 (TabBar) + Bài 2 (CartScreen, đủ 3 vùng: cuộn / tổng tiền
// cố định / tab bar cố định). 3 tab còn lại (Trang chủ, Danh mục, Tài khoản) chỉ để
// TabBar có đủ 4 mục thật như đề bài — nội dung của chúng thuộc Giờ 2 và Giờ 4,
// nên ở đây chỉ để placeholder, tránh trùng lặp code với project gio2/gio4.
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { CartScreen } from './screens/CartScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CART_ITEMS, BOOKS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(3); // Giả lập có sẵn 3 món

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Hàm render nội dung chính dựa vào tab đang chọn
  const renderContent = () => {
    if (activeTab === 'home') {
      if (selectedBook) {
        return (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => setCartCount((n) => n + 1)}
          />
        );
      }
      return (
        <HomeScreen
          cartCount={cartCount}
          onPressBook={(id) => setSelectedBookId(id)}
          onPressCart={() => setActiveTab('cart')} // Bấm nút nổi chuyển sang tab Giỏ hàng
        />
      );
    }

    if (activeTab === 'cart') {
      return <CartScreen items={CART_ITEMS} />;
    }

    if (activeTab === 'category') {
      return <CategoryScreen />;
    }

    // Các tab chưa làm giao diện
    return <Placeholder tab={activeTab} />;
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {renderContent()}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: '',
    category: 'Màn hình Danh mục đang được xây dựng.',
    cart: '',
    account: 'Màn hình Tài khoản đang được xây dựng.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
});