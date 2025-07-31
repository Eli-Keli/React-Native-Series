import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesState } from '@/types';

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (favorite) => 
        set((state) => ({
          favorites: [...state.favorites, favorite]
        })),
      removeFavorite: (id) => 
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id)
        })),
      isFavorite: (id) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.id === id);
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);