import {
  ClientResponse,
  CustomerSignInResult,
  CategoryPagedQueryResponse,
  MyCustomerDraft,
  Customer,
  ProductProjectionPagedQueryResponse,
  ProductProjection,
  CustomerDraft,
  Category,
  Cart,
} from '@commercetools/platform-sdk';

import { rootClient } from '../client';

export const loginUser = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };

  return rootClient.apiClient.me().login().post(methodArgs).execute();
};

export const registerUser = (customerData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };

  return rootClient.apiClient.customers().post(methodArgs).execute();
};

export const getMe = (): Promise<ClientResponse<Customer>> => rootClient.apiClient.me().get().execute();

export const getShoppingLists = (): Promise<ClientResponse<CategoryPagedQueryResponse>> => rootClient.apiClient.categories().get().execute();

export const getProductByKey = (key: string): Promise<ClientResponse<ProductProjection>> =>
  rootClient.apiClient.productProjections().withKey({ key }).get().execute();

export const searchProducts = async (
  categoryId: string | null,
  sortOption: string | null,
  filterOptions: string | null,
  searchOptions: string | null,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const queryArgs: {
    filter?: string[];
    sort?: string;
    fuzzy?: boolean;
    ['text.en-US']?: string;
  } = {};

  if (categoryId) {
    queryArgs.filter = [`categories.id:"${categoryId}"`];
  }

  if (sortOption) {
    queryArgs.sort = sortOption;
  }

  if (filterOptions) {
    queryArgs.filter = (queryArgs.filter || []).concat(filterOptions.split(/(?=variants\.)/));
  }

  if (searchOptions) {
    queryArgs.fuzzy = true;
    queryArgs['text.en-US'] = searchOptions;
  }

  return rootClient.apiClient.productProjections().search().get({ queryArgs }).execute();
};

export const getCartById = (cartId: string): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient.me().carts().withId({ ID: cartId }).get().execute();

export const addItemToCart = (cartId: string, cartVersion: number, productId: string): void => {
  rootClient.apiClient
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [{ action: 'addLineItem', productId, variantId: 1, quantity: 1 }],
      },
    })
    .execute();
};

export const createCart = (): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();

export const deleteCart = (cartId: string, cartVersion: number): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({ queryArgs: { version: cartVersion } })
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

export const getCategoryById = (ID: string): Promise<ClientResponse<Category>> => rootClient.apiClient.categories().withId({ ID }).get().execute();
