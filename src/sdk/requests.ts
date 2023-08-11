import { ClientResponse, CustomerSignInResult, MyCustomerDraft } from '@commercetools/platform-sdk';

import { apiRootWithPasswordFlow } from './root';

export const login = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const { email, password } = customerData;
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRootWithPasswordFlow(email, password).me().login().post(methodArgs).execute();
};

export const register = (customerData: MyCustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const { email, password } = customerData;
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRootWithPasswordFlow(email, password).me().signup().post(methodArgs).execute();
};
