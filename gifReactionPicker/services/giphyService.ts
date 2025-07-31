// GIPHY Service
import { GiphyResponse } from '@/types';

// You'll need to get your own API key from https://developers.giphy.com/
// For demo purposes, using the public beta key (limited requests)
const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Demo key - get your own!
const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

export class GiphyService {
    static async searchGifs(query: string, limit: number = 20, offset: number = 0): Promise<GiphyResponse> {
        try {
            const url = `${GIPHY_BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&rating=g&lang=en`;

            console.log('Fetching GIFs from GIPHY:', { query, limit, offset });

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`GIPHY API error: ${response.status} ${response.statusText}`);
            }

            const data: GiphyResponse = await response.json();
            console.log('GIPHY response:', { count: data.data.length, total: data.pagination.total_count });

            return data;
        } catch (error) {
            console.error('Error fetching GIFs from GIPHY:', error);
            throw error;
        }
    }

    static async getTrendingGifs(limit: number = 20, offset: number = 0): Promise<GiphyResponse> {
        try {
            const url = `${GIPHY_BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${offset}&rating=g`;

            console.log('Fetching trending GIFs from GIPHY:', { limit, offset });

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`GIPHY API error: ${response.status} ${response.statusText}`);
            }

            const data: GiphyResponse = await response.json();
            console.log('GIPHY trending response:', { count: data.data.length, total: data.pagination.total_count });

            return data;
        } catch (error) {
            console.error('Error fetching trending GIFs from GIPHY:', error);
            throw error;
        }
    }

    static extractGifUrls(giphyResponse: GiphyResponse): string[] {
        return giphyResponse.data.map(gif => gif.images.fixed_height.url);
    }

    static getEmotionSearchTerms(emotionId: string): string[] {
        const searchTerms: Record<string, string[]> = {
            excited: ['excited', 'celebration', 'party', 'happy dance', 'yay'],
            happy: ['happy', 'smile', 'joy', 'cheerful', 'laughing'],
            sad: ['sad', 'crying', 'tears', 'disappointed', 'upset'],
            angry: ['angry', 'mad', 'furious', 'rage', 'annoyed'],
            confused: ['confused', 'puzzled', 'thinking', 'what', 'huh'],
            bored: ['bored', 'tired', 'sleepy', 'yawn', 'uninterested'],
            surprised: ['surprised', 'shocked', 'wow', 'amazed', 'omg'],
            love: ['love', 'heart', 'kiss', 'romantic', 'affection'],
        };

        return searchTerms[emotionId] || [emotionId];
    }
}