import { ClientResponse, CustomerSignInResult, CategoryPagedQueryResponse, MyCustomerDraft, Customer } from '@commercetools/platform-sdk';

import { rootClient } from './client';

export const login = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };

  return rootClient.apiClient.me().login().post(methodArgs).execute();
};

export const register = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };

  return rootClient.apiClient.me().signup().post(methodArgs).execute();
};

export const getMe = (): Promise<ClientResponse<Customer>> => {
  return rootClient.apiClient.me().get().execute();
};

export const getShoppingLists = (): Promise<ClientResponse<CategoryPagedQueryResponse>> => {
  return rootClient.apiClient.categories().get().execute();
};
