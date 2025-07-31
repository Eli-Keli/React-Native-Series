import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { FavoriteGif } from '@/types';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function FavoritesScreen() {
    const router = useRouter();

    const { favorites, removeFavorite } = useFavoritesStore();

    const handleRemove = (id: string) => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        removeFavorite(id);
    };

    const renderItem = ({ item, index }: { item: FavoriteGif; index: number }) => {
        return (
            <View style={[styles.card, { borderColor: item.color + '30' }]}>
                <View style={styles.cardHeader}>
                    <View style={styles.emotionInfo}>
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <Text style={styles.emotionName}>{item.emotionName}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleRemove(item.id)}
                        style={[styles.removeButton, { backgroundColor: item.color + '15' }]}
                    >
                        <Trash2 size={18} color={item.color} />
                    </TouchableOpacity>
                </View>
                <View style={styles.gifContainer}>
                    <Image
                        source={{ uri: item.gifUrl }}
                        style={styles.gif}
                        contentFit="contain"
                    />
                </View>
            </View>
        );
    };

    const EmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySubtitle}>
                Bookmark your favorite reaction GIFs to see them here
            </Text>
            <TouchableOpacity
                style={styles.browseButton}
                onPress={() => router.push('/')}
            >
                <Text style={styles.browseButtonText}>Browse Emotions</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Favorites</Text>
                <Text style={styles.subtitle}>
                    {favorites.length > 0
                        ? `You have ${favorites.length} saved reaction${favorites.length === 1 ? '' : 's'}`
                        : 'Save your favorite reaction GIFs'
                    }
                </Text>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyState}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: 24,
        paddingTop: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6C757D',
        marginBottom: 16,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        flexGrow: 1,
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    emotionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 20,
        marginRight: 8,
    },
    emotionName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    removeButton: {
        padding: 8,
        borderRadius: 8,
    },
    gifContainer: {
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F8F9FA',
    },
    gif: {
        width: '100%',
        height: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 12,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#6C757D',
        textAlign: 'center',
        marginBottom: 24,
    },
    browseButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    browseButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});
