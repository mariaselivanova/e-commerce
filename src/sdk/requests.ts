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

export const login = async (customerData: ILoginUserData): Promise<void> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  try {
    await apiRoot.login().post(methodArgs).execute();
  } catch (error) {
    console.log(error);
  }
};

export const createCustomer = async (customerData: IRegisterUserData): Promise<void> => {
  const methodArgs = {
    body: {
      ...customerData,
    },
  };
  try {
    await apiRoot.customers().post(methodArgs).execute();
  } catch (error) {
    console.log(error);
  }
};
