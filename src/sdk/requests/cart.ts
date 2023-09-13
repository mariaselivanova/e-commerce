import { ClientResponse, Cart } from '@commercetools/platform-sdk';

import { rootClient } from '../client';

export const getCartById = (cartId: string): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient.me().carts().withId({ ID: cartId }).get().execute();

export const addItemToCart = (cartId: string, cartVersion: number, productId: string): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [{ action: 'addLineItem', productId, variantId: 1, quantity: 1 }],
      },
    })
    .execute();

export const removeItemFromCart = (cartId: string, cartVersion: number, lineItemId: string): void => {
  rootClient.apiClient
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,

        actions: [{ action: 'removeLineItem', lineItemId, quantity: 1 }],
      },
    })
    .execute();
};

export const createCart = (): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();

export const deleteCart = (cartId: string, cartVersion: number): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({ queryArgs: { version: cartVersion } })
    .execute();
