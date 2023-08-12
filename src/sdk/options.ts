import { AnonymousAuthMiddlewareOptions, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { tokenCache } from './tokenStorage';

import { EnvVars } from '../utils/types';

export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (typeof value !== 'string') {
    throw new Error(`${name} is not defined`);
  }
  return value;
}

const scopes = getEnvVariable(EnvVars.scopes).split(' ');

export const getAnonymousOptions = (): AnonymousAuthMiddlewareOptions => {
  return {
    host: getEnvVariable(EnvVars.auth_url),
    projectKey: getEnvVariable(EnvVars.project_key),
    credentials: {
      clientId: getEnvVariable(EnvVars.client_id),
      clientSecret: getEnvVariable(EnvVars.client_secret),
    },
    scopes,
    tokenCache,
  };
};

export const getPasswordOptions = (email: string, password: string): PasswordAuthMiddlewareOptions => {
  return {
    host: getEnvVariable(EnvVars.auth_url),
    projectKey: getEnvVariable(EnvVars.project_key),
    credentials: {
      clientId: getEnvVariable(EnvVars.client_id),
      clientSecret: getEnvVariable(EnvVars.client_secret),
      user: {
        username: email,
        password,
      },
    },
    scopes,
    tokenCache,
  };
};

export const getHttpOptions = (): HttpMiddlewareOptions => {
  return {
    host: getEnvVariable(EnvVars.api_url),
    fetch,
  };
};
