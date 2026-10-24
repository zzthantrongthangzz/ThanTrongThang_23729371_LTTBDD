import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../theme';

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return <View style={styles.center}><Text style={styles.big}>Xin chào 👋</Text></View>;
}

function ProfileScreen() {
  return (
    <View style={styles.center}>
      <View style={styles.avatar}><Text style={styles.avatarText}>NA</Text></View>
      <Text style={styles.big}>Nguyễn Văn An</Text>
      <Text style={styles.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <View style={styles.settingsRoot}>
      <View style={styles.row}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={styles.status}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={({ route }) => ({
        drawerActiveTintColor: colors.red,
        drawerIcon: ({ focused, color, size }) => {
          let iconName: any = "home-outline";
          if (route.name === "Profile") iconName = "person-outline";
          if (route.name === "Settings") iconName = "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  big: { fontSize: 24, fontWeight: 'bold' },
  muted: { color: colors.muted, fontSize: 16, marginTop: 4 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.line, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 30, fontWeight: 'bold' },
  settingsRoot: { flex: 1, padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  label: { fontSize: 18 },
  status: { marginTop: 20, textAlign: 'center', color: colors.muted, fontSize: 16 }
});
