import { ctpClient } from './client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'e-commerce_react-cats' });
