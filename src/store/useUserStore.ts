import { create } from 'zustand';

type IUserState = {
  name: string;
  addName: (name: string) => void;
  removeName: () => void;
};

export const useUserStore = create<IUserState>(set => ({
  name: '',
  addName: (name: string) =>
    set(state => ({
      name: (state.name = name),
    })),
  removeName: () =>
    set(state => ({
      name: '',
    })),
}));
