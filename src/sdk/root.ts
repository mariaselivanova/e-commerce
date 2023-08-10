import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { clientWithAnonymousSessionFlow } from './client';
import { getEnvVariable } from './client';
import { EnvVars } from '../utils/types';

const apiRootWithAnonymousSessionFlow = createApiBuilderFromCtpClient(clientWithAnonymousSessionFlow).withProjectKey({
  projectKey: getEnvVariable(EnvVars.project_key),
});

export { apiRootWithAnonymousSessionFlow };
