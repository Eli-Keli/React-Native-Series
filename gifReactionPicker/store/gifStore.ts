// Zustand store for state management
import { create } from 'zustand';
import { GifState } from '@/types';

export const useGifStore = create<GifState>((set) => ({
    selectedEmotion: null,
    setSelectedEmotion: (emotion) => set({ selectedEmotion: emotion }),
}));