import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { RootProps } from './types';
import { PHONES, PHONE_COLORS } from '../data/phones';
import { useFavorites } from './FavoritesContext';
import { colors, formatPrice } from '../theme';
import { Stars } from '../components/Stars';

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;                       
  const { has, toggle } = useFavorites();
  const phone = PHONES.find(p => p.id === id);

  if (!phone) return <Text style={{ padding: 16 }}>Không tìm thấy sản phẩm #{id}</Text>;

  return (
    <View style={styles.root}>
      <Image 
        source={PHONE_COLORS[phone.defaultColor].image} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <Text style={styles.name}>{phone.name}</Text>
      <View style={styles.row}>
        <Stars value={phone.rating} />
        <Text style={styles.supplier}>Cung cấp bởi: {phone.supplier}</Text>
      </View>
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>

      <Pressable 
        style={styles.favBtn} 
        onPress={() => toggle(phone.id)}
      >
        <Text style={styles.favBtnText}>
          {has(phone.id) ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  supplier: { color: colors.muted, fontSize: 14 },
  price: { fontSize: 22, fontWeight: 'bold', color: colors.red, marginBottom: 20 },
  favBtn: { backgroundColor: colors.line, padding: 16, borderRadius: 8 },
  favBtnText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold' }
});
