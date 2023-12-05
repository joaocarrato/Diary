import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IDiaryCard } from '../@types/interface';

interface IDiaryStore {
  diaries: IDiaryCard[];
  addCard: (id: string, text: string) => void;
  removeCard: (id: string) => void;
  removeAll: () => void;
}

export const useDiaryStore = create(
  persist<IDiaryStore>(
    set => ({
      diaries: [],
      addCard: (id: string, text: string) =>
        set(state => ({
          diaries: [...state.diaries, { id: id, text: text }],
        })),
      removeCard: (id: string) =>
        set(state => ({
          diaries: state.diaries.filter(value => value.id !== id),
        })),
      removeAll: () =>
        set(state => ({
          diaries: [],
        })),
    }),
    {
      name: 'diaryStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
