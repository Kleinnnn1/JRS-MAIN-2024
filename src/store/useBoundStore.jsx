import { create } from "zustand";

const useBoundStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
}));

export default useBoundStore;
