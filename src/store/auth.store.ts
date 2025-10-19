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
import { LOGIN_MUTATION, SIGNUP_MUTATION, VERIFY_EMAIL_MUTATION, RESEND_VERIFICATION_MUTATION } from '@/graphql/mutations/auth';

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
  signup: (email: string, password: string, name: string) => Promise<{ requiresVerification: boolean; userId: string; message: string }>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
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
       * Creates new user account - requires email verification before login
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

          set({ isLoading: false });

          if (data?.signup) {
            return {
              requiresVerification: data.signup.requiresVerification,
              userId: data.signup.userId,
              message: data.signup.message,
            };
          }

          throw new Error('Signup failed. Please try again.');
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
       * Verify email function
       * Verifies user's email with token from email
       */
      verifyEmail: async (token: string) => {
        try {
          set({ error: null, isLoading: true });

          const { data } = await apolloClient.mutate({
            mutation: VERIFY_EMAIL_MUTATION,
            variables: { token },
          });

          set({ isLoading: false });

          if (!data?.verifyEmail?.success) {
            throw new Error(data?.verifyEmail?.message || 'Email verification failed.');
          }
        } catch (err) {
          const apolloError = err as ApolloError;
          const errorMessage =
            apolloError.graphQLErrors[0]?.message || 'Email verification failed. Please try again.';

          set({
            error: errorMessage,
            isLoading: false,
          });

          throw new Error(errorMessage);
        }
      },

      /**
       * Resend verification email
       * Sends a new verification email to the user
       */
      resendVerification: async (email: string) => {
        try {
          set({ error: null, isLoading: true });

          const { data } = await apolloClient.mutate({
            mutation: RESEND_VERIFICATION_MUTATION,
            variables: { email },
          });

          set({ isLoading: false });

          if (!data?.resendVerification?.success) {
            throw new Error(data?.resendVerification?.message || 'Failed to resend verification email.');
          }
        } catch (err) {
          const apolloError = err as ApolloError;
          const errorMessage =
            apolloError.graphQLErrors[0]?.message || 'Failed to resend verification email.';

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
  verifyEmail: (token: string) => useAuthStore.getState().verifyEmail(token),
  resendVerification: (email: string) => useAuthStore.getState().resendVerification(email),
  logout: () => useAuthStore.getState().logout(),
  setUser: (user: UserData | null) => useAuthStore.getState().setUser(user),
  clearError: () => useAuthStore.getState().clearError(),
};
