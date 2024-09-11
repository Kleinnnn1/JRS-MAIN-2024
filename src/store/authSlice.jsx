// authSlice.js

import { getCurrentUser } from "../service/apiAuth"; // Import your API function

const createAuthSlice = (set, get) => ({
  session: null,
  user: null, // Store user metadata
  isAuthenticated: false, // Store authentication status
  userRole: null, // Store user role
  isLoading: true, // Track loading state

  // Action to set session
  setSession: (session) => set({ session }),

  // Action to set user metadata
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      userRole: user?.userrole || null,
      isLoading: false,
    });
  },

  // Action to fetch user data
  fetchUserData: async () => {
    if (!get().user) {
      // Check if user data is already fetched
      set({ isLoading: true }); // Set loading to true while fetching
      try {
        const userData = await getCurrentUser(); // Fetch user data
        set({
          user: userData,
          isAuthenticated: !!userData,
          userRole: userData?.userrole || null,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        set({ isLoading: false });
      }
    }
  },

  // Action to clear user data
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      userRole: null,
      isLoading: false,
    }),
});

export default createAuthSlice;
