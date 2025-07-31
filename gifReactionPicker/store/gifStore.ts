// Zustand store for state management
import { create } from 'zustand';
import { GifState } from '@/types';
import { GiphyService } from '@/services/giphyService';

export const useGifStore = create<GifState>((set, get) => ({
    selectedEmotion: null,
    isLoading: false,
    setSelectedEmotion: (emotion) => set({ selectedEmotion: emotion }),
    setIsLoading: (loading) => set({ isLoading: loading }),

    fetchGifs: async (emotionId: string): Promise<string[]> => {
        try {
            set({ isLoading: true });
            console.log('Fetching GIFs for emotion:', emotionId);

            const searchTerms = GiphyService.getEmotionSearchTerms(emotionId);
            const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

            console.log('Using search term:', randomTerm);

            const response = await GiphyService.searchGifs(randomTerm, 25);
            const gifUrls = GiphyService.extractGifUrls(response);

            console.log('Fetched GIF URLs:', gifUrls.length);

            return gifUrls;
        } catch (error) {
            console.error('Error fetching GIFs:', error);
            // Return fallback GIFs if API fails
            return getFallbackGifs(emotionId);
        } finally {
            set({ isLoading: false });
        }
    },
}));

// Fallback GIFs in case GIPHY API fails
function getFallbackGifs(emotionId: string): string[] {
    const fallbackGifs: Record<string, string[]> = {
        excited: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/l3q2Z6S6n38zjPswo/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/DhstvI3zZ598Nb1rFf/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/5GoVLqeAOo6PK/giphy.gif",
        ],
        happy: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/chzz1FQgqhytWRWbp3/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/l4FGjIfMXEtJ5YMxG/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/XR9Dp54ZC4dji/giphy.gif",
        ],
        sad: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/OPU6wzx8JrHna/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/7SF5scGB2AFrgsXP63/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/d2lcHJTG5Tgrmelt6/giphy.gif",
        ],
        angry: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/l1J9u3TZfpmeDLkD6/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/11tTNkNy1SdXGg/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/3oFzm87mppMaXc6qxG/giphy.gif",
        ],
        confused: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/3o7btPCcdNniyf0ArS/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/TPl5N4Ci49ZQY/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/3o7527pa7qs9kCG78A/giphy.gif",
        ],
        bored: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/tO5ddHjpXB6lG/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/jroCyq3UG48YU/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/xTiTnglxjavpMILKGk/giphy.gif",
        ],
        surprised: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/5VKbvrjxpVJCM/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/3krrjoL0vHRaWqrPWc/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/vQqeT3AYg8S5O/giphy.gif",
        ],
        love: [
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/LnKM6jbBenbVXp6x9Y/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/M90mJUSuCcGK4/giphy.gif",
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWJtZnRtZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZnRqZg/l4pTdcifPZLBDkOIg/giphy.gif",
        ],
    };

    return fallbackGifs[emotionId] || [];
}