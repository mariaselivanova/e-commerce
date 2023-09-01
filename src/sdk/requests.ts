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

export const getProductsProjections = (): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> =>
  rootClient.apiClient.productProjections().get().execute();

export const getProductByKey = (key: string): Promise<ClientResponse<ProductProjection>> =>
  rootClient.apiClient.productProjections().withKey({ key }).get().execute();

export const updateCustomerInfo = (data: ProfileEditInfoModal, id: string, version: number): Promise<void | ClientResponse<Customer>> =>
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

export const setDefaultBillingAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
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

export const setBillingAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addBillingAddressId',
            addressId,
          },
        ],
      },
    })
    .execute();

export const removeBillingAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeBillingAddressId',
            addressId,
          },
        ],
      },
    })
    .execute();

export const setDefaultShippingAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
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

export const setShippingAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId,
          },
        ],
      },
    })
    .execute();

export const removeShippingAddress = (customerId: string, version: number, addressId: string): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeBillingAddressId',
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

export const createAddress = (customerId: string, version: number, address: Address): Promise<void | ClientResponse<Customer>> =>
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

export const changeAddress = (customerId: string, version: number, addressId: string, address: Address): Promise<void | ClientResponse<Customer>> =>
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
