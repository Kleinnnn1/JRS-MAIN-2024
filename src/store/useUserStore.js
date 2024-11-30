import { create } from "zustand";
import SecureStorage from "../auth/SecureLocalStorage"; // Ensure this path matches your project structure

const useUserStore = create((set) => {
  // Initialize state from SecureStorage or with default values
  const initialEncryptedState = SecureStorage.getItem("ez-tq-po-ak");
  const initialState = initialEncryptedState
    ? JSON.parse(initialEncryptedState) // Decrypt and parse the data if available
    : {
        idNumber: null,
        role: null,
        fName: null,
        lName: null,
        userRole: null,
      };

  return {
    userMetadata: initialState,
    setUserMetadata: (metadata) => {
      set((state) => {
        const updatedMetadata = { ...state.userMetadata, ...metadata };
        const encryptedData = JSON.stringify(updatedMetadata);
        SecureStorage.setItem("ez-tq-po-ak", encryptedData); // Encrypt and store the updated data
        return { userMetadata: updatedMetadata };
      });
    },
    clearUserMetadata: () => {
      SecureStorage.removeItem("ez-tq-po-ak"); // Remove the encrypted data
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
