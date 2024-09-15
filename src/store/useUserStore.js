import { create } from "zustand";

// Store user data in metadata
const useUserStore = create((set) => {
  // Initialize state from localStorage or with default values
  const initialState = JSON.parse(localStorage.getItem("userMetadata")) || {
    idnumber: null,
    role: null,
    fname: null,
    lname: null,
    userrole: null,
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
          idnumber: null,
          role: null,
          fname: null,
          lname: null,
          userrole: null,
        },
      });
    },
  };
});

export default useUserStore;

// import { create } from "zustand";
// //Store user data in meta data

// const useUserStore = create((set) => {
//   const initialState = JSON.parse(localStorage.getItem("userMetadata")) || {
//     idnumber: null,
//     role: null,
//     fname: null,
//     lname: null,
//     userrole: null,
//   };

//   return {
//     userMetadata: initialState,
//     setUserMetadata: (metadata) => {
//       const updatedMetadata = { ...initialState, ...metadata };
//       localStorage.setItem("userMetadata", JSON.stringify(updatedMetadata));
//       set({ userMetadata: updatedMetadata });
//     },
//     clearUserMetadata: () => {
//       localStorage.removeItem("userMetadata");
//       set({
//         userMetadata: {
//           idnumber: null,
//           role: null,
//           fname: null,
//           lname: null,
//           userrole: null,
//         },
//       });
//     },
//   };
// });

// export default useUserStore;
