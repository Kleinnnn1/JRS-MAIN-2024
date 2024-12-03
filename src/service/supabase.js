// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

import { createClient } from "@supabase/supabase-js";
import SecureStorage from "../auth/SecureLocalStorage";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: {
      async getItem(key) {
        return SecureStorage.getItem(key); // Retrieve encrypted value
      },
      async setItem(key, value) {
        return SecureStorage.setItem(key, value); // Store encrypted value
      },
      async removeItem(key) {
        return SecureStorage.removeItem(key); // Remove the encrypted value
      },
    },
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;

// import { createClient } from "@supabase/supabase-js";
// import SecureStorage from "../auth/SecureLocalStorage";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     storage: {
//       async getItem(key) {
//         return SecureStorage.getItem(key); // Retrieve encrypted value
//       },
//       async setItem(key, value) {
//         return SecureStorage.setItem(key, value); // Store encrypted value
//       },
//       async removeItem(key) {
//         return SecureStorage.removeItem(key); // Remove the encrypted value
//       },
//     },
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

// export default supabase;
