import { create } from 'zustand';

type LoginUser = {
  id: string | null;
  email: string | null;
  auth: boolean | undefined;
};

type State = {
  loginUser: LoginUser;
  updateLoginUser: (_payload: LoginUser) => void;
  resetLoginUser: () => void;
};

export const useStore = create<State>((set) => ({
  loginUser: {
    id: null,
    email: null,
    auth: undefined,
  },
  updateLoginUser: (payload) => set({ loginUser: payload }),
  resetLoginUser: () => set({ loginUser: { id: null, email: null, auth: undefined } }),
}));
