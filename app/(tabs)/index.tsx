import { ScrollView, StyleSheet } from 'react-native';

import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AboutScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Maxèe</ThemedText>
            </ThemedView>
            <LogoutButton />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "blue",
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 300,
        backgroundColor: "transparent",
        justifyContent: "center",
    },
});