import dayjs from 'dayjs';
import {
  ClientResponse,
  CustomerSignInResult,
  CategoryPagedQueryResponse,
  MyCustomerDraft,
  Customer,
  ProductProjectionPagedQueryResponse,
  ProductProjection,
  CustomerDraft,
  Address,
  Category,
} from '@commercetools/platform-sdk';

import { ProfileEditInfoModal } from '../utils/types';

import { rootClient } from './client';

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

export const getAllCategories = (): Promise<ClientResponse<CategoryPagedQueryResponse>> =>
  rootClient.apiClient
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute();

export const updateCustomerInfo = (data: ProfileEditInfoModal, id: string, version: number): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setFirstName',
            firstName: data.firstname,
          },
          {
            action: 'setLastName',
            lastName: data.lastname,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: dayjs(data.date).format('YYYY-MM-DD'),
          },
          {
            action: 'changeEmail',
            email: data.email,
          },
        ],
      },
    })
    .execute();

export const updateCustomerPassword = (
  currentPassword: string,
  newPassword: string,
  id: string,
  version: number,
): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .password()
    .post({
      body: {
        id,
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();

export const setDefaultBillingAddress = (customerId: string, version: number, addressId: string): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

export const setDefaultShippingAddress = (customerId: string, version: number, addressId: string): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

export const removeAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

export const createAddress = (customerId: string, version: number, address: Address): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addAddress',
            address,
          },
        ],
      },
    })
    .execute();

export const changeAddress = (customerId: string, version: number, addressId: string, address: Address): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeAddress',
            addressId,
            address,
          },
        ],
      },
    })
    .execute();

export const getCategoryById = (ID: string): Promise<ClientResponse<Category>> => rootClient.apiClient.categories().withId({ ID }).get().execute();
