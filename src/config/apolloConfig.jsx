import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH } from "../constants";

// This module intentionally does not contain any hardcoded URLs, environment
// variable names, API keys or secrets. To use Apollo, call `initApolloClient(uri)`
// from application bootstrap code and then call `getApolloClient()` where needed.

let apolloClient = null;

export function initApolloClient(uri) {
  if (!uri) {
    throw new Error("Apollo client initialization requires a URI argument.");
  }

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH.token);
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  });

  const httpLink = createHttpLink({ uri });

  apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return apolloClient;
}

export function getApolloClient() {
  if (!apolloClient) {
    throw new Error(
      "Apollo client not initialized. Call initApolloClient(uri) first."
    );
  }
  return apolloClient;
}
