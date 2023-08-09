import { ctpClient, getEnvVariable } from './client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: getEnvVariable('REACT_APP_PROJECT_KEY') });
