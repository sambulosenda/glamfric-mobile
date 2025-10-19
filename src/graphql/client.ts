import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { ENV } from '@/shared/constants/env';

/**
 * HTTP Link for GraphQL requests
 */
const httpLink = createHttpLink({
  uri: ENV.GRAPHQL_URL,
});

/**
 * Auth Link - adds JWT token to request headers
 */
const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await SecureStore.getItemAsync('authToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    return { headers };
  }
});

/**
 * Apollo Client instance
 */
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});
