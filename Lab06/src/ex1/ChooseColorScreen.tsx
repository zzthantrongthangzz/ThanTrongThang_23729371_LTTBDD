import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SelectPhoneParamList } from './SelectPhoneApp';
import { ColorKey, Phone } from '../types';
import { PHONE_COLORS, COLOR_ORDER } from '../data/phones';
import { colors, formatPrice } from '../theme';

type Props = NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>
 
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable 
              key={key} 
              onPress={() => setPicked(key)}
              style={[
                styles.swatch, 
                { backgroundColor: PHONE_COLORS[key].hex }, 
                picked === key && styles.swatchOn
              ]} 
            />
          ))}
        </View>
        
        <Pressable 
          style={styles.doneBtn} 
          onPress={() => navigation.navigate({ name: "Product", params: { color: picked }, merge: true })}
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: 'row', padding: 16, height: 160 },
  thumb: { width: 100, height: 130, marginRight: 16 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 14, color: colors.text },
  bold: { fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginTop: 4 },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 },
  hint: { fontSize: 16, marginBottom: 16 },
  swatches: { alignItems: 'center', gap: 12 },
  swatch: { width: 85, height: 80, shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: {width: 0, height: 2}, elevation: 3 },
  swatchOn: { borderWidth: 2, borderColor: colors.blue },
  doneBtn: { backgroundColor: colors.blue, borderRadius: 4, padding: 16, marginTop: 'auto' },
  doneBtnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }
});
