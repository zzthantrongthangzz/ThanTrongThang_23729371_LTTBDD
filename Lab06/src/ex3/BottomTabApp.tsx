import React, { useMemo, useState } from "react";
import { FlatList, View, Text, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Tabs = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<Tabs>();
const ICONS: Record<keyof Tabs, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"], Search: ["search", "search-outline"], Profile: ["person", "person-outline"],
};
function PhoneList({ phones = PHONES }: { phones?: typeof PHONES }) {
  return <FlatList data={phones} keyExtractor={(item) => item.id} contentContainerStyle={styles.list}
    renderItem={({ item }) => <View style={styles.card}>
      <Text style={styles.name}>{item.name.split(" - ")[0]}</Text><Text style={styles.price}>{formatPrice(item.price)}</Text>
    </View>} />;
}
function HomeTab() { return <PhoneList />; }
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const matches = useMemo(() => PHONES.filter((phone) => phone.name.toLowerCase().includes(keyword.trim().toLowerCase())), [keyword]);
  return <View style={styles.searchRoot}>
    <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={styles.input} />
    {matches.length ? <PhoneList phones={matches} /> : <Text style={styles.empty}>Không có kết quả cho “{keyword}”</Text>}
  </View>;
}
function ProfileTab() {
  return <View style={styles.profile}><View style={styles.avatar}><Text style={styles.avatarText}>NA</Text></View>
    <Text style={styles.profileName}>Nguyễn Văn An</Text><Text style={styles.email}>an.nguyen@example.com</Text></View>;
}
export function BottomTabApp() {
  return <NavigationContainer><Tab.Navigator screenOptions={({ route }) => ({
    tabBarActiveTintColor: colors.red, headerTitleAlign: "center",
    tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />,
  })}>
    <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
    <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
    <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
  </Tab.Navigator></NavigationContainer>;
}
const styles = StyleSheet.create({
  list: { padding: 16, gap: 10, flexGrow: 1 }, card: { backgroundColor: "white", borderRadius: 10, padding: 16, elevation: 1 },
  name: { fontSize: 16, color: colors.text, marginBottom: 8 }, price: { fontWeight: "700", color: colors.red },
  searchRoot: { flex: 1, backgroundColor: colors.bg, padding: 16 }, input: { backgroundColor: "white", borderColor: colors.line, borderWidth: 1, borderRadius: 10, padding: 13, fontSize: 16, marginBottom: 8 },
  empty: { textAlign: "center", color: colors.muted, marginTop: 30, fontSize: 16 }, profile: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  avatarText: { color: "white", fontSize: 34, fontWeight: "700" }, profileName: { fontSize: 22, fontWeight: "700", color: colors.text }, email: { marginTop: 6, fontSize: 16, color: colors.muted },
});

