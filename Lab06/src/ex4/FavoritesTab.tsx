import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { TabProps } from './types';
import { PHONES } from '../data/phones';
import { useFavorites } from './FavoritesContext';
import { colors, formatPrice } from '../theme';

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favoritePhones = PHONES.filter(p => ids.includes(p.id));

  if (favoritePhones.length === 0) {
    return <Text style={styles.empty}>Chưa có sản phẩm nào được lưu.</Text>;
  }

  return (
    <FlatList 
      data={favoritePhones}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <Pressable 
          style={styles.card} 
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: colors.muted },
  card: { padding: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 1 },
  name: { fontSize: 16, color: colors.text, marginBottom: 8 },
  price: { color: colors.red, fontWeight: 'bold' }
});
