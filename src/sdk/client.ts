import fetch from 'node-fetch';
import {
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';

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

class NewClient {
  private httpOptions: HttpMiddlewareOptions;

  constructor(httpOptions: HttpMiddlewareOptions) {
    this.httpOptions = httpOptions;
  }

  createClientWithPasswordFlow(passwordOptions: PasswordAuthMiddlewareOptions): Client {
    return new ClientBuilder().withPasswordFlow(passwordOptions).withHttpMiddleware(this.httpOptions).build();
  }

  createClientWithAnonymousSessionFlow(anonymousOptions: AnonymousAuthMiddlewareOptions): Client {
    return new ClientBuilder().withHttpMiddleware(this.httpOptions).withAnonymousSessionFlow(anonymousOptions).build();
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
  tokenCache,
};
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: getEnvVariable(EnvVars.api_url),
  fetch,
};

const clientWithAnonymousSessionFlow = new NewClient(httpMiddlewareOptions).createClientWithAnonymousSessionFlow(anonymousSessionMiddlewareOptions);

const clientWithPasswordFlow = (email: string, password: string): Client => {
  return new NewClient(httpMiddlewareOptions).createClientWithPasswordFlow({
    host: getEnvVariable(EnvVars.auth_url),
    projectKey: getEnvVariable(EnvVars.project_key),
    credentials: {
      clientId: getEnvVariable(EnvVars.client_id),
      clientSecret: getEnvVariable(EnvVars.client_secret),
      user: {
        username: email,
        password: password,
      },
    },
    scopes,
    tokenCache,
  });
};

export { clientWithAnonymousSessionFlow, clientWithPasswordFlow };
