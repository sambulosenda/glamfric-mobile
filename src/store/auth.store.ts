import { create } from 'zustand';
import { ApolloError } from '@apollo/client';
import { mmkvPersist } from './middleware/mmkv-persist';
import {
  saveAuthToken,
  removeAuthToken,
  UserData,
  saveUserData,
  removeUserData,
} from '@/features/auth/authStorage';
import { apolloClient } from '@/graphql/client';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '@/graphql/mutations/auth';

/**
 * Auth Store State Interface
 */
interface AuthState {
  // State
  user: UserData | null;
  isLoading: boolean;
  error: string | null;

  // Computed
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Internal hydration
  _hasHydrated: boolean;
  _setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Auth Store
 *
 * Using Zustand with MMKV persistence for:
 * - Better performance (no Context re-renders)
 * - Simpler API (no Provider needed)
 * - Automatic persistence
 * - Better DevTools support
 *
 * Note: Auth token stays in SecureStore, only user data is persisted in MMKV
 */
export const useAuthStore = create<AuthState>()(
  mmkvPersist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      _hasHydrated: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      _setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),

      /**
       * Login function
       * Authenticates user and persists auth data
       */
      login: async (email: string, password: string) => {
        try {
          set({ error: null, isLoading: true });

          const { data } = await apolloClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              input: { email, password },
            },
          });

          if (data?.login) {
            const { token, user: userData } = data.login;

            // Save token to SecureStore (most secure)
            await saveAuthToken(token);

            // Save user data to MMKV (encrypted, fast access)
            await saveUserData(userData);

            // Update store state (will auto-persist via middleware)
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (err) {
          const apolloError = err as ApolloError;
          const errorMessage =
            apolloError.graphQLErrors[0]?.message || 'Login failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
          });

          throw new Error(errorMessage);
        }
      },

      /**
       * Signup function
       * Creates new user account and authenticates
       */
      signup: async (email: string, password: string, name: string) => {
        try {
          set({ error: null, isLoading: true });

          const { data } = await apolloClient.mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
              input: { email, password, name },
            },
          });

          if (data?.signup) {
            const { token, user: userData } = data.signup;

            // Save token to SecureStore
            await saveAuthToken(token);

            // Save user data to MMKV
            await saveUserData(userData);

            // Update store state
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } catch (err) {
          const apolloError = err as ApolloError;
          const errorMessage =
            apolloError.graphQLErrors[0]?.message || 'Signup failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
          });

          throw new Error(errorMessage);
        }
      },

      /**
       * Logout function
       * Clears all auth data and resets Apollo cache
       */
      logout: async () => {
        try {
          set({ isLoading: true });

          // Clear auth token from SecureStore
          await removeAuthToken();

          // Clear user data from MMKV
          removeUserData();

          // Clear Apollo cache to remove any cached user-specific data
          await apolloClient.clearStore();

          // Reset store state
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          console.error('Error during logout:', err);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user data, not loading/error states
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // Called after hydration from MMKV
      onHydrate: (state) => {
        console.log('[Auth Store] Hydrated from storage:', {
          hasUser: !!state.user,
          userId: state.user?.id,
        });
      },
    },
  ),
);

/**
 * Selectors for optimized re-renders
 * Use these in components to subscribe only to specific state slices
 */
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

/**
 * Auth actions as standalone functions
 * Useful for calling outside React components
 */
export const authActions = {
  login: (email: string, password: string) =>
    useAuthStore.getState().login(email, password),
  signup: (email: string, password: string, name: string) =>
    useAuthStore.getState().signup(email, password, name),
  logout: () => useAuthStore.getState().logout(),
  setUser: (user: UserData | null) => useAuthStore.getState().setUser(user),
  clearError: () => useAuthStore.getState().clearError(),
};
