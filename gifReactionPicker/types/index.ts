// Type definitions
export interface Emotion {
    id: string;
    name: string;
    emoji: string;
    color: string;
    gifs: string[];
}

export interface GiphyGif {
    id: string;
    url: string;
    images: {
        original: {
            url: string;
            width: string;
            height: string;
        };
        fixed_height: {
            url: string;
            width: string;
            height: string;
        };
    };
}

export interface GiphyResponse {
    data: GiphyGif[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
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
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    fetchGifs: (emotion: string) => Promise<string[]>;
}
export interface FavoritesState {
    favorites: FavoriteGif[];
    addFavorite: (favorite: FavoriteGif) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}