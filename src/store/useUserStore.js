import { create } from "zustand";

// Store user data in metadata
const useUserStore = create((set) => {
  // Initialize state from localStorage or with default values
  const initialState = JSON.parse(localStorage.getItem("userMetadata")) || {
    idNumber: null,
    role: null,
    fName: null,
    lName: null,
    userRole: null,
  };

  return {
    userMetadata: initialState,
    setUserMetadata: (metadata) => {
      // Merge existing state with new metadata
      set((state) => {
        const updatedMetadata = { ...state.userMetadata, ...metadata };
        localStorage.setItem("userMetadata", JSON.stringify(updatedMetadata));
        return { userMetadata: updatedMetadata };
      });
    },
    clearUserMetadata: () => {
      localStorage.removeItem("userMetadata");
      set({
        userMetadata: {
          idNumber: null,
          role: null,
          fName: null,
          lName: null,
          userRole: null,
        },
      });
    },
  };
});

export default useUserStore;
