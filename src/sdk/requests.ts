import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';

import { apiRoot } from './root';

interface ILoginUserData {
  email: string;
  password: string;
}

export const login = (customerData: ILoginUserData): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRoot.login().post(methodArgs).execute();
};

export const createCustomer = async (customerData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRoot.customers().post(methodArgs).execute();
};
