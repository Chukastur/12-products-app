import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { router } from "expo-router";

const LoginScreen = () => {
  const { login } = useAuthStore();

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    const { email, password } = form;
    console.log({ email, password });

    if (email.length === 0 || password.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccesful = await login(email, password);
    setIsPosting(false);

    if (wasSuccesful) {
      router.replace("/(products-app)/(home)");
      return;
    }

    Alert.alert("Error", "Usuario o contraseña no válidos");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor, ingrese para continuar
          </ThemedText>
        </View>

        {/* Email y password */}
        <View style={{ marginTop: 29 }}>
          <ThemedTextInput
            placeholder="Correo electonico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <ThemedButton
          title="login"
          onPress={onLogin}
          disabled={isPosting}
          icon="arrow-forward-outline"
        >
          Ingresar
        </ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 50 }} />

        {/* Enlace a registro */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>¿No tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
