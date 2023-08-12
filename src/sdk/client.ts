import fetch from 'node-fetch';
import { ClientBuilder, HttpMiddlewareOptions, PasswordAuthMiddlewareOptions, AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { EnvVars } from '../utils/types';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (typeof value !== 'string') {
    throw new Error(`${name} is not defined`);
  }
  return value;
}

const scopes = getEnvVariable(EnvVars.scopes).split(' ');

const anonymousOptions: AnonymousAuthMiddlewareOptions = {
  host: getEnvVariable(EnvVars.auth_url),
  projectKey: getEnvVariable(EnvVars.project_key),
  credentials: {
    clientId: getEnvVariable(EnvVars.client_id),
    clientSecret: getEnvVariable(EnvVars.client_secret),
  },
  scopes,
};

class ApiClient {
  private httpOptions: HttpMiddlewareOptions;

  private _apiClient: ByProjectKeyRequestBuilder;

  constructor(httpOptions: HttpMiddlewareOptions) {
    this.httpOptions = httpOptions;
    const client = new ClientBuilder().withHttpMiddleware(this.httpOptions).withAnonymousSessionFlow(anonymousOptions).build();
    this._apiClient = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: getEnvVariable(EnvVars.project_key),
    });
  }

  get apiClient() {
    return this._apiClient;
  }

  updateWithPasswordFlow({ email, password }: { email: string; password: string }) {
    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
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
    };

    const client = new ClientBuilder().withPasswordFlow(passwordAuthMiddlewareOptions).withHttpMiddleware(this.httpOptions).build();
    this._apiClient = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: getEnvVariable(EnvVars.project_key),
    });
  }

  updateWithAnonymousSessionFlow() {
    const client = new ClientBuilder().withHttpMiddleware(this.httpOptions).withAnonymousSessionFlow(anonymousOptions).build();
    this._apiClient = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: getEnvVariable(EnvVars.project_key),
    });
  }
}

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: getEnvVariable(EnvVars.api_url),
  fetch,
};

// singleton for the whole app
export const rootClient = new ApiClient(httpMiddlewareOptions);
