import fetch from 'node-fetch';
import { ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions, AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { EnvVars } from '../utils/types';

export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (typeof value !== 'string') {
    throw new Error(`${name} is not defined`);
  }
  return value;
}

const scopes = getEnvVariable(EnvVars.scopes).split(' ');

/* const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: getEnvVariable(EnvVars.auth_url),
  projectKey: getEnvVariable(EnvVars.project_key),
  credentials: {
    clientId: getEnvVariable(EnvVars.client_id),
    clientSecret: getEnvVariable(EnvVars.client_secret),
    user: {
      username: 'test123@mail.ru',
      password: 'password',
    },
  },
  scopes,
}; */

class Client {
  private httpOptions: HttpMiddlewareOptions;

  constructor(httpOptions: HttpMiddlewareOptions) {
    this.httpOptions = httpOptions;
  }

  getClientWithPasswordFlow(passwordOptions: PasswordAuthMiddlewareOptions) {
    return new ClientBuilder().withPasswordFlow(passwordOptions).withHttpMiddleware(this.httpOptions).build();
  }

  createClientWithAnonymousSessionFlow(anonymousOptions: AnonymousAuthMiddlewareOptions) {
    return new ClientBuilder().withAnonymousSessionFlow(anonymousOptions).withHttpMiddleware(this.httpOptions).build();
  }
}

const anonymousSessionMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: getEnvVariable(EnvVars.auth_url),
  projectKey: getEnvVariable(EnvVars.project_key),
  credentials: {
    clientId: getEnvVariable(EnvVars.client_id),
    clientSecret: getEnvVariable(EnvVars.client_secret),
  },
  scopes,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: getEnvVariable(EnvVars.api_url),
  fetch,
};

const clientWithAnonymousSessionFlow = new Client(httpMiddlewareOptions).createClientWithAnonymousSessionFlow(anonymousSessionMiddlewareOptions);

export { clientWithAnonymousSessionFlow };
