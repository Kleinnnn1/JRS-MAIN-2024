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
