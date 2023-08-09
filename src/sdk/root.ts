import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { ctpClient, getEnvVariable } from './client';
import { EnvVars } from '../utils/types';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: getEnvVariable(EnvVars.project_key) });
