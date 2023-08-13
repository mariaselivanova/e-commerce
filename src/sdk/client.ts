import { Client, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import { getEnvVariable, getAnonymousOptions, getHttpOptions, getPasswordOptions } from './options';
import { clearToken } from './tokenStorage';

import { EnvVars } from '../utils/types';

class ApiClient {
  private httpOptions: HttpMiddlewareOptions;

  private _apiClient: ByProjectKeyRequestBuilder;

  constructor(httpOptions: HttpMiddlewareOptions) {
    this.httpOptions = httpOptions;

    this._apiClient = this.buildAnonymousClient();
  }

  get apiClient() {
    return this._apiClient;
  }

  private buildAnonymousClient(): ByProjectKeyRequestBuilder {
    const client = new ClientBuilder().withHttpMiddleware(this.httpOptions).withAnonymousSessionFlow(getAnonymousOptions()).build();
    return this.createApiBuilder(client);
  }

  private buildPasswordClient(email: string, password: string): ByProjectKeyRequestBuilder {
    const client = new ClientBuilder().withHttpMiddleware(this.httpOptions).withPasswordFlow(getPasswordOptions(email, password)).build();
    return this.createApiBuilder(client);
  }

  private createApiBuilder(client: Client): ByProjectKeyRequestBuilder {
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: getEnvVariable(EnvVars.project_key),
    });
  }

  public updateWithPasswordFlow({ email, password }: { email: string; password: string }): void {
    clearToken();
    this._apiClient = this.buildPasswordClient(email, password);
  }

  public updateWithAnonymousSessionFlow(): void {
    clearToken();
    this._apiClient = this.buildAnonymousClient();
  }
}

// singleton for the whole app
export const rootClient = new ApiClient(getHttpOptions());
