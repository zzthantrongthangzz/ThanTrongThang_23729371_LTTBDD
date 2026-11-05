import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { register } from "../services/authService";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { validateEmail, validatePassword, validateRequired } from "../utils/validators";
import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

type FieldErrors = Record<string, string | null>;

export function RegisterScreen({ navigation, route }: RootScreenProps<"Register">) {
  const { signIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next: FieldErrors = {
      name: validateRequired("họ tên")(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: !confirm ? "Vui lòng nhập lại mật khẩu" : confirm === password ? null : "Mật khẩu nhập lại không khớp",
    };
    setErrors(next);
    setSubmitError(null);
    if (Object.values(next).some(Boolean)) return;
    setLoading(true);
    try {
      const auth = await register(name, email, password);
      signIn(auth.user, auth.token);
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", { total: route.params.total ?? 0 });
      } else {
        navigation.navigate("Tabs", { screen: "Home" });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Tạo tài khoản mới</Text>
        <FormField label="Họ tên" value={name} onChangeText={(v) => { setName(v); setErrors((e) => ({ ...e, name: null })); }} error={errors.name} autoCapitalize="words" autoComplete="name" />
        <FormField label="Email" value={email} onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: null })); }} error={errors.email} keyboardType="email-address" autoComplete="email" />
        <FormField label="Mật khẩu" value={password} onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: null, confirm: confirm && confirm !== v ? "Mật khẩu nhập lại không khớp" : null })); }} error={errors.password} secureTextEntry autoComplete="new-password" />
        <FormField label="Nhập lại mật khẩu" value={confirm} onChangeText={(v) => { setConfirm(v); setErrors((e) => ({ ...e, confirm: v ? (v === password ? null : "Mật khẩu nhập lại không khớp") : null })); }} error={errors.confirm} secureTextEntry autoComplete="new-password" />
        {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
        <PrimaryButton title="Đăng ký" onPress={submit} loading={loading} />
        <Pressable onPress={() => navigation.replace("Login", route.params)}>
          <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, gap: 14 },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, textAlign: "center", marginBottom: 6 },
  submitError: { color: colors.danger, textAlign: "center" },
  link: { color: colors.indigo, fontWeight: "700", textAlign: "center" },
});
