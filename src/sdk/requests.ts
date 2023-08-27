import {
  ClientResponse,
  CustomerSignInResult,
  CategoryPagedQueryResponse,
  MyCustomerDraft,
  Customer,
  ProductProjectionPagedQueryResponse,
  ProductProjection,
} from '@commercetools/platform-sdk';

import { rootClient } from './client';

export const loginUser = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };

  return rootClient.apiClient.me().login().post(methodArgs).execute();
};

export const registerUser = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };

  return rootClient.apiClient.me().signup().post(methodArgs).execute();
};

export const getMe = (): Promise<ClientResponse<Customer>> => rootClient.apiClient.me().get().execute();

export const getShoppingLists = (): Promise<ClientResponse<CategoryPagedQueryResponse>> => rootClient.apiClient.categories().get().execute();

export const getProductsProjections = (): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> =>
  rootClient.apiClient.productProjections().get().execute();

export const getProductByKey = (key: string): Promise<ClientResponse<ProductProjection>> =>
  rootClient.apiClient.productProjections().withKey({ key }).get().execute();

export const getProductsByCategory = (categoryId: string): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> =>
  rootClient.apiClient
    .productProjections()
    .get({
      queryArgs: {
        where: `categories(id="${categoryId}")`,
      },
    })
    .execute();

export const getAllCategories = (): Promise<ClientResponse<CategoryPagedQueryResponse>> =>
  rootClient.apiClient
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute();
