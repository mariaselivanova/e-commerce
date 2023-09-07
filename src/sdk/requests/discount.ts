import { ClientResponse, DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import { rootClient } from '../client';

export const getDiscountCodes = (): Promise<ClientResponse<DiscountCodePagedQueryResponse>> => rootClient.apiClient.discountCodes().get().execute();
