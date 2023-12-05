import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type IUserState = {
  name: string;
  addName: (name: string) => void;
  removeName: () => void;
};

export const useUserStore = create(
  persist<IUserState>(
    set => ({
      name: '',
      addName: (name: string) =>
        set(state => ({
          name: (state.name = name),
        })),
      removeName: () =>
        set(state => ({
          name: '',
        })),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
