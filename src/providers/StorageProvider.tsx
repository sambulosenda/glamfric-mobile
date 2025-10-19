import React, { useEffect, useState, ReactNode } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { initializeStorage } from '@/lib/storage';
import { hydrateAllStores } from '@/store';

interface StorageProviderProps {
  children: ReactNode;
}

/**
 * Provider that initializes MMKV storage before rendering children
 * This ensures storage is ready before any component tries to use it
 */
export const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('[StorageProvider] Starting initialization...');
        await initializeStorage();
        console.log('[StorageProvider] ✅ Storage initialized');

        // Hydrate all Zustand stores after storage is ready
        hydrateAllStores();

        setIsStorageReady(true);
        console.log('[StorageProvider] ✅ Initialization complete');
      } catch (err) {
        console.error('[StorageProvider] ❌ Failed to initialize storage:', err);
        setError(err instanceof Error ? err : new Error('Unknown storage error'));
        // Don't set ready to true on error - show error instead
      }
    };

    init();
  }, []);

  // Show error state if initialization failed
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Storage Initialization Failed
        </Text>
        <Text style={{ color: '#666', textAlign: 'center' }}>
          {error.message}
        </Text>
        <Text style={{ color: '#999', fontSize: 12, marginTop: 20, textAlign: 'center' }}>
          Please restart the app. If the problem persists, try reinstalling.
        </Text>
      </View>
    );
  }

  // Show loading while initializing
  if (!isStorageReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#EF4444" />
        <Text style={{ marginTop: 16, color: '#666' }}>Initializing storage...</Text>
      </View>
    );
  }

  return <>{children}</>;
};
