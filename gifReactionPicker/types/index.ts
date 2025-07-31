// Type definitions
export interface Emotion {
    id: string;
    name: string;
    emoji: string;
    color: string;
    gifs: string[];
}

export interface FavoriteGif {
    id: string;
    emotionId: string;
    emotionName: string;
    emoji: string;
    color: string;
    gifUrl: string;
}

export interface GifState {
    selectedEmotion: Emotion | null;
    setSelectedEmotion: (emotion: Emotion | null) => void;
}

export interface FavoritesState {
    favorites: FavoriteGif[];
    addFavorite: (favorite: FavoriteGif) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}