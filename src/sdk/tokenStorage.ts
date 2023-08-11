import { TokenCache } from '@commercetools/sdk-client-v2';

const tokenCacheKey = 'authToken';

function getStoredToken(key: string) {
  return localStorage.getItem(key);
}

function storeToken(key: string, value: string) {
  localStorage.setItem(key, value);
}

export const tokenCache: TokenCache = {
  get: () => {
    const storedToken = getStoredToken(tokenCacheKey);
    return storedToken ? JSON.parse(storedToken) : null;
  },
  set: (cache) => {
    const tokenString = JSON.stringify(cache);
    storeToken(tokenCacheKey, tokenString);
  },
};
