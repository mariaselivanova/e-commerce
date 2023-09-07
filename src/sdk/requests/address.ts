import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { rootClient } from '../client';

export const setDefaultBillingAddress = (customerId: string, version: number, addressId: string | undefined): Promise<ClientResponse<Customer>> =>
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

export const setDefaultShippingAddress = (customerId: string, version: number, addressId: string | undefined): Promise<ClientResponse<Customer>> =>
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

export const resetDefaultBillingAddress = (customerId: string, version: number): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setDefaultBillingAddress',
          },
        ],
      },
    })
    .execute();

export const resetDefaultShippingAddress = (customerId: string, version: number): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setDefaultShippingAddress',
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
