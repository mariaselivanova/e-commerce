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

const middlewareOptions = {
  scopes: getEnvVariable(EnvVars.scopes).split(' '),
  host: getEnvVariable(EnvVars.auth_url),
  projectKey: getEnvVariable(EnvVars.project_key),
  clientId: getEnvVariable(EnvVars.client_id),
  clientSecret: getEnvVariable(EnvVars.client_secret),
};

export const getAnonymousOptions = (): AnonymousAuthMiddlewareOptions => {
  const { host, projectKey, clientId, clientSecret, scopes } = middlewareOptions;

  return {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    scopes,
    tokenCache,
  };
};

export const getPasswordOptions = (email: string, password: string): PasswordAuthMiddlewareOptions => {
  const { host, projectKey, clientId, clientSecret, scopes } = middlewareOptions;

  return {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
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
  const { host } = middlewareOptions;

  return {
    host,
    fetch,
  };
};
