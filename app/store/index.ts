import create from 'zustand';

type LoginUser = {
  id: string | null;
  email: string | null;
};

type State = {
  loginUser: LoginUser;
  updateLoginUser: (_payload: LoginUser) => void;
  resetLoginUser: () => void;
};

export const useStore = create<State>((set) => ({
  loginUser: {
    id: '',
    email: '',
  },
  updateLoginUser: (payload) => set({ loginUser: payload }),
  resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),
}));
