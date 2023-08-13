import { TokenCache } from '@commercetools/sdk-client-v2';

const tokenCacheKey = 'authToken';

function getStoredToken(key: string): string {
  return localStorage.getItem(key) || '';
}

function storeToken(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function clearToken(): void {
  localStorage.removeItem(tokenCacheKey);
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
