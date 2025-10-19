import { MMKV } from 'react-native-mmkv';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const ENCRYPTION_KEY_STORAGE_KEY = 'mmkv-encryption-key';

/**
 * Generate a random encryption key for MMKV
 */
const generateEncryptionKey = async (): Promise<string> => {
  // Generate 32 random bytes for AES-256 encryption
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  // Convert to hex string
  return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Get or create encryption key for MMKV
 * Stored securely in the device keychain/keystore
 */
const getEncryptionKey = async (): Promise<string> => {
  try {
    let encryptionKey = await SecureStore.getItemAsync(ENCRYPTION_KEY_STORAGE_KEY);

    if (!encryptionKey) {
      console.log('[Storage] Generating new encryption key...');
      encryptionKey = await generateEncryptionKey();
      await SecureStore.setItemAsync(ENCRYPTION_KEY_STORAGE_KEY, encryptionKey);
      console.log('[Storage] Encryption key saved to SecureStore');
    } else {
      console.log('[Storage] Using existing encryption key');
    }

    return encryptionKey;
  } catch (error) {
    console.error('[Storage] Error getting encryption key:', error);
    throw new Error('Failed to initialize secure storage');
  }
};

/**
 * Initialize MMKV storage instances
 * Call this once during app initialization
 */
let appStorageInstance: MMKV | null = null;
let cacheStorageInstance: MMKV | null = null;

export const initializeStorage = async (): Promise<void> => {
  try {
    console.log('[Storage] Initializing storage...');

    const encryptionKey = await getEncryptionKey();
    console.log('[Storage] Encryption key obtained');

    // Main app storage (encrypted)
    appStorageInstance = new MMKV({
      id: 'glamfric-app-storage',
      encryptionKey,
    });
    console.log('[Storage] App storage instance created');

    // Cache storage (non-encrypted for better performance)
    cacheStorageInstance = new MMKV({
      id: 'glamfric-cache-storage',
    });
    console.log('[Storage] Cache storage instance created');
    console.log('[Storage] ✅ Storage initialized successfully');
  } catch (error) {
    console.error('[Storage] ❌ Failed to initialize storage:', error);
    throw error;
  }
};

/**
 * Check if storage is initialized
 */
export const isStorageInitialized = (): boolean => {
  return appStorageInstance !== null && cacheStorageInstance !== null;
};

/**
 * Get app storage instance
 * Throws if storage hasn't been initialized
 */
export const getAppStorage = (): MMKV => {
  if (!appStorageInstance) {
    throw new Error(
      'Storage not initialized. Call initializeStorage() before using storage.'
    );
  }
  return appStorageInstance;
};

/**
 * Get cache storage instance
 * Throws if storage hasn't been initialized
 */
export const getCacheStorage = (): MMKV => {
  if (!cacheStorageInstance) {
    throw new Error(
      'Storage not initialized. Call initializeStorage() before using storage.'
    );
  }
  return cacheStorageInstance;
};
