import CryptoJS from "crypto-js";

class SecureStorage {
  // Use a static encryption key
  static encryptionKey = import.meta.env.VITE_ENCRYPT_KEY; // Predefined secret key

  // Encrypt a value with the static encryption key
  static encrypt(value) {
    const encrypted = CryptoJS.AES.encrypt(
      value,
      SecureStorage.encryptionKey
    ).toString();
    return encrypted;
  }

  // Decrypt a value with the static encryption key
  static decrypt(encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(
      encryptedValue,
      SecureStorage.encryptionKey
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Store an item in localStorage with encryption
  static setItem(key, value) {
    const encryptedValue = SecureStorage.encrypt(value); // Encrypt the value
    localStorage.setItem(key, encryptedValue); // Save the encrypted value in localStorage
    return encryptedValue;
  }

  // Get an item from localStorage with decryption
  static getItem(key) {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) {
      return null;
    }
    const decryptedValue = SecureStorage.decrypt(encryptedValue);
    return decryptedValue;
  }

  // Remove an item from localStorage
  static removeItem(key) {
    localStorage.removeItem(key);
  }
}

export default SecureStorage;

// import CryptoJS from "crypto-js";

// class SecureStorage {
//   // Generate a random encryption key
//   static generateEncryptionKey() {
//     return CryptoJS.lib.WordArray.random(16).toString(); // 16 bytes key for AES-128
//   }

//   // Encrypt a value with the given encryption key
//   static encrypt(key, value) {
//     const encrypted = CryptoJS.AES.encrypt(value, key).toString();
//     return encrypted;
//   }

//   // Decrypt a value with the given encryption key
//   static decrypt(key, encryptedValue) {
//     const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   }

//   // Store an item in localStorage with encryption
//   static async setItem(key, value) {
//     const encryptionKey = SecureStorage.generateEncryptionKey(); // Generate a new encryption key
//     const encryptedValue = SecureStorage.encrypt(encryptionKey, value); // Encrypt the value

//     // Save the encrypted value in localStorage
//     localStorage.setItem(key, encryptedValue);

//     // Save the encryption key in sessionStorage (it will be cleared when the session ends)
//     sessionStorage.setItem(`${key}-encryptionKey`, encryptionKey);

//     return encryptedValue;
//   }

//   // Get an item from localStorage with decryption
//   static async getItem(key) {
//     const encryptedValue = localStorage.getItem(key);
//     const encryptionKey = sessionStorage.getItem(`${key}-encryptionKey`);

//     if (!encryptedValue || !encryptionKey) {
//       return null;
//     }

//     const decryptedValue = SecureStorage.decrypt(encryptionKey, encryptedValue);
//     return decryptedValue;
//   }

//   // Remove an item from localStorage and sessionStorage
//   static async removeItem(key) {
//     localStorage.removeItem(key);
//     sessionStorage.removeItem(`${key}-encryptionKey`);
//   }
// }

// export default SecureStorage;
