import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      setPhone(await fetchPhone("1"));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Đã xảy ra lỗi");
    }
  }, []);
  useEffect(() => { load(); }, [load]);
  if (error) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
    <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>{error}</Text><Button title="THỬ LẠI" onPress={load} />
  </View>;
  if (!phone) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#4F63C8" /><Text style={{ marginTop: 10 }}>Đang tải...</Text>
  </View>;
  return <SelectPhoneApp phone={phone} />;
}
