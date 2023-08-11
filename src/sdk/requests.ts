import { ClientResponse, CustomerSignInResult, MyCustomerDraft } from '@commercetools/platform-sdk';

import { apiRootWithAnonymousSessionFlow } from './root';

export const login = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRootWithAnonymousSessionFlow.me().login().post(methodArgs).execute();
};

export const register = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRootWithAnonymousSessionFlow.me().signup().post(methodArgs).execute();
};
