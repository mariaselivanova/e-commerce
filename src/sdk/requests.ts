import { BaseAddress } from '@commercetools/platform-sdk';

import { apiRoot } from './root';

interface IRegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: BaseAddress[];
  shippingAddresses: number[];
  defaultShippingAddress: number;
  billingAddresses: number[];
  defaultBillingAddress: number;
}

interface ILoginUserData {
  email: string;
  password: string;
}

export const login = (customerData: ILoginUserData) => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRoot.login().post(methodArgs).execute();
};

export const createCustomer = (customerData: IRegisterUserData) => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  return apiRoot.customers().post(methodArgs).execute();
};
