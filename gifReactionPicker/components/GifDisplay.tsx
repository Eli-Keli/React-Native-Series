// Component to display the GIF
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Animated, ActivityIndicator, Alert, Dimensions, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { RefreshCw, ArrowLeft, Bookmark, Share as ShareIcon } from 'lucide-react-native';

import { Colors } from '@/constants/Colors';
import { useGifStore } from '@/store/gifStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export const GifDisplay: React.FC = () => {
    const router = useRouter();
    const selectedEmotion = useGifStore((state) => state.selectedEmotion);
    const [currentGifIndex, setCurrentGifIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

    useEffect(() => {
        setIsLoading(true);
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.9);
    }, [currentGifIndex]);

    if (!selectedEmotion) {
        router.replace('/');
        return null;
    }

    const currentGifUrl = selectedEmotion.gifs[currentGifIndex];
    const favoriteId = `${selectedEmotion.id}-${currentGifIndex}`;
    const isFavorited = isFavorite(favoriteId);

    const handleRefresh = () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        const nextIndex = (currentGifIndex + 1) % selectedEmotion.gifs.length;
        setCurrentGifIndex(nextIndex);
    };

    const handleBack = () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        router.back();
    };

    const handleImageLoad = () => {
        setIsLoading(false);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
    };

    const toggleFavorite = () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        if (isFavorited) {
            removeFavorite(favoriteId);
        } else {
            addFavorite({
                id: favoriteId,
                emotionId: selectedEmotion.id,
                emotionName: selectedEmotion.name,
                emoji: selectedEmotion.emoji,
                color: selectedEmotion.color,
                gifUrl: currentGifUrl,
            });
        }
    };

    const handleShare = async () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        try {
            if (Platform.OS === 'web') {
                // Web fallback
                Alert.alert(
                    "Share",
                    "Sharing is not available on web. Here's the GIF URL:",
                    [
                        { text: "Copy URL", onPress: () => Alert.alert("URL Copied", currentGifUrl) },
                        { text: "Cancel", style: "cancel" }
                    ]
                );
                return;
            }

            const result = await Share.share({
                url: currentGifUrl,
                message: `Check out this ${selectedEmotion.name} reaction!`,
                title: `${selectedEmotion.name} Reaction GIF`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert("Error", "Could not share the GIF");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.emoji}>{selectedEmotion.emoji}</Text>
                    <Text style={styles.title}>{selectedEmotion.name}</Text>
                </View>
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={toggleFavorite} style={styles.actionButton}>
                        <Bookmark
                            size={24}
                            color={isFavorited ? selectedEmotion.color : Colors.text}
                            fill={isFavorited ? selectedEmotion.color : 'transparent'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                        <ShareIcon size={24} color={Colors.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.gifContainer}>
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={selectedEmotion.color} />
                    </View>
                )}
                <Animated.View
                    style={[
                        styles.animatedContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}
                >
                    <Image
                        source={{ uri: currentGifUrl }}
                        style={styles.gif}
                        contentFit="contain"
                        onLoad={handleImageLoad}
                    />
                </Animated.View>
            </View>

            <TouchableOpacity
                style={[styles.refreshButton, { backgroundColor: selectedEmotion.color }]}
                onPress={handleRefresh}
                activeOpacity={0.8}
            >
                <RefreshCw size={24} color="#FFFFFF" />
                <Text style={styles.refreshText}>New Reaction</Text>
            </TouchableOpacity>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingTop: 8,
    },
    backButton: {
        padding: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: 8,
        marginLeft: 8,
    },
    emoji: {
        fontSize: 24,
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
    },
    gifContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.card,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    animatedContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    gif: {
        width: width - 32,
        height: height * 0.5,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    refreshText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
});