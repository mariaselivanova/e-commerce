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
} from '@commercetools/platform-sdk';

import { rootClient } from '../client';

const PRODUCTS_PER_PAGE = 6;

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
  offset: number,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const queryArgs: {
    filter?: string[];
    sort?: string;
    fuzzy?: boolean;
    limit: number;
    offset: number;
    ['text.en-US']?: string;
  } = {
    limit: PRODUCTS_PER_PAGE,
    offset,
  };

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
