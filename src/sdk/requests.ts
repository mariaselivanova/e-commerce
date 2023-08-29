import {
  ClientResponse,
  CustomerSignInResult,
  CategoryPagedQueryResponse,
  MyCustomerDraft,
  Customer,
  ProductProjectionPagedQueryResponse,
  ProductProjection,
  CustomerDraft,
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
            dateOfBirth: data.date.toISOString().substring(0, 10),
          },
          {
            action: 'changeEmail',
            email: data.email,
          },
        ],
      },
    })
    .execute();

// export const updateCustomerPassword = (password: string, id: string, version: number): Promise<void | ClientResponse<Customer>> =>
//   rootClient.apiClient
//   .customers()
//   .withId({ ID: id })
//   .post({
//     body: {
//       version,
//       actions: [
//         {
//           action: '',
//           password,
//         },
//       ],
//     },
//   })
//   .execute();
