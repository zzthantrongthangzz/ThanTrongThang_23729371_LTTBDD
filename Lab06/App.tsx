import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";
import { PHONES } from "./src/data/phones";

const LABS = [
  { title: "Bài 1 · Chọn màu điện thoại", subtitle: "Select Phone · Stack và truyền màu", icon: "phone-portrait-outline" as const },
  { title: "Bài 2 · Kết nối API", subtitle: "Tải dữ liệu điện thoại từ MockAPI", icon: "cloud-download-outline" as const },
  { title: "Bài 3 · Bottom Tab", subtitle: "Trang chủ, tìm kiếm và cá nhân", icon: "albums-outline" as const },
  { title: "Bài 4 · Stack + Tab", subtitle: "Sản phẩm, yêu thích và truyền params", icon: "layers-outline" as const },
  { title: "Bài 5 · Drawer", subtitle: "Trang chủ, hồ sơ và cài đặt", icon: "menu-outline" as const },
];
export default function App() {
  const [selected, setSelected] = useState<number | null>(null);
  const screens = [
    <SelectPhoneApp key="local" phone={PHONES[0]} />,
    <SelectPhoneApi key="api" />,
    <BottomTabApp key="tabs" />,
    <StackTabApp key="stack" />,
    <DrawerApp key="drawer" />,
  ];
  return <SafeAreaView style={styles.root}>
    <StatusBar barStyle="dark-content" />
    {selected === null ? <ScrollView contentContainerStyle={styles.menu}>
      <Text style={styles.kicker}>THỰC HÀNH REACT NATIVE · LAB 06</Text>
      <Text style={styles.heading}>Navigation</Text>
      <Text style={styles.intro}>Chọn bài thực hành để mở ứng dụng.</Text>
      {LABS.map((lab, index) => <Pressable key={lab.title} style={styles.card} onPress={() => setSelected(index)}>
        <View style={styles.icon}><Ionicons name={lab.icon} size={24} color={colors.red} /></View>
        <View style={styles.cardText}><Text style={styles.cardTitle}>{lab.title}</Text><Text style={styles.cardSub}>{lab.subtitle}</Text></View>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </Pressable>)}
    </ScrollView> : <View style={styles.exercise}>
      <Pressable style={styles.back} onPress={() => setSelected(null)}><Ionicons name="arrow-back" size={20} color={colors.text} /><Text style={styles.backText}>Danh sách bài</Text></Pressable>
      <View style={styles.content}>{screens[selected]}</View>
    </View>}
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" }, menu: { padding: 22, paddingTop: 30, backgroundColor: colors.bg, flexGrow: 1 },
  kicker: { color: colors.red, letterSpacing: 1, fontWeight: "700", fontSize: 12 }, heading: { color: colors.text, fontSize: 34, fontWeight: "800", marginTop: 8 },
  intro: { color: colors.muted, fontSize: 16, marginTop: 8, marginBottom: 24 }, card: { backgroundColor: "white", borderRadius: 14, padding: 16, marginBottom: 12, flexDirection: "row", alignItems: "center", elevation: 2 },
  icon: { width: 46, height: 46, borderRadius: 13, backgroundColor: "#FFF0F0", alignItems: "center", justifyContent: "center", marginRight: 13 },
  cardText: { flex: 1 }, cardTitle: { color: colors.text, fontSize: 16, fontWeight: "700" }, cardSub: { color: colors.muted, fontSize: 13, marginTop: 4 },
  exercise: { flex: 1 }, back: { height: 46, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, gap: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  backText: { color: colors.text, fontWeight: "600" }, content: { flex: 1 },
});

