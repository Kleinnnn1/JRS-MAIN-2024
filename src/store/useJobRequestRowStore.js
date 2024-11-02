import { create } from "zustand";

export const useJobRequestRowStore = create((set) => ({
  stableRequests: [],
  setInitialRequests: (requests) =>
    set((state) => {
      if (state.stableRequests.length === 0) {
        // Store initial data with a stable index
        const requestsWithIndex = requests.map((request, index) => ({
          ...request,
          initialRowIndex: index + 1,
        }));
        return { stableRequests: requestsWithIndex };
      }
      return state; // Keep existing stable data if already set
    }),
}));
