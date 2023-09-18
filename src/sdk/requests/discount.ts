import { Cart, ClientResponse, DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { rootClient } from '../client';

export const getDiscountCodes = (): Promise<ClientResponse<DiscountCodePagedQueryResponse>> => rootClient.apiClient.discountCodes().get().execute();

export const addDiscount = (cartId: string, discountCode: string, version: number): Promise<ClientResponse<Cart>> =>
  rootClient.apiClient
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [{ action: 'addDiscountCode', code: discountCode }],
      },
    })
    .execute();
