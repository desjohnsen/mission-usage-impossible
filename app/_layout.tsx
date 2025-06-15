import { auth } from "@/firebase/firebase.config";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsub;
    }, []);

    useEffect(() => {
        console.log("Auth state changed:", user);
    }, [user])

    if (!fontsLoaded || loading) return null;

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="index" />
                ) : (
                    <>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="+not-found" />
                    </>
                )}
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}