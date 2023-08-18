import { ClientResponse, CustomerSignInResult, CategoryPagedQueryResponse, MyCustomerDraft, Customer } from '@commercetools/platform-sdk';

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
