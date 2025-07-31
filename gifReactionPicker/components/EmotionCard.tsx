// Card component for each emotion
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { useGifStore } from '@/store/gifStore';
import { Emotion } from '@/types';

interface EmotionCardProps {
    emotion: Emotion;
}

export const EmotionCard: React.FC<EmotionCardProps> = ({ emotion }) => {
    const router = useRouter();
    const { setSelectedEmotion, fetchGifs } = useGifStore();

    const handlePress = async () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        try {
            console.log('Fetching GIFs for emotion:', emotion.name);
            const gifUrls = await fetchGifs(emotion.id);

            const emotionWithGifs = {
                ...emotion,
                gifs: gifUrls,
            };

            setSelectedEmotion(emotionWithGifs);
            router.push('/gif');
        } catch (error) {
            console.error('Error fetching GIFs:', error);
            // Still navigate with empty gifs array as fallback
            setSelectedEmotion(emotion);
            router.push('/gif');
        }
    };

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: emotion.color + '15' }]}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>{emotion.emoji}</Text>
                <Text style={styles.name}>{emotion.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 32,
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
    },
});