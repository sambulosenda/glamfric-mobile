import * as SecureStore from 'expo-secure-store';
import { storage, StorageKeys } from '@/lib/storage';

const AUTH_TOKEN_KEY = 'authToken';

export interface UserData {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

/**
 * Save authentication token securely
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw error;
  }
};

/**
 * Get authentication token
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Remove authentication token
 */
export const removeAuthToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
    throw error;
  }
};

/**
 * Save user data to storage
 * Uses MMKV (encrypted) for better performance
 * Auth token stays in SecureStore for maximum security
 */
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    storage.set(StorageKeys.USER_DATA, userData);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

/**
 * Get user data from storage
 * Synchronous for better performance (no await needed!)
 */
export const getUserData = (): UserData | null => {
  try {
    return storage.get<UserData>(StorageKeys.USER_DATA);
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Remove user data from storage
 */
export const removeUserData = (): void => {
  try {
    storage.remove(StorageKeys.USER_DATA);
  } catch (error) {
    console.error('Error removing user data:', error);
    throw error;
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthData = async (): Promise<void> => {
  await removeAuthToken();
  removeUserData();
};
