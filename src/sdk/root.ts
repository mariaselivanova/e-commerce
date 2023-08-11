import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { clientWithAnonymousSessionFlow, clientWithPasswordFlow } from './client';
import { getEnvVariable } from './client';
import { EnvVars } from '../utils/types';

const apiRootWithAnonymousSessionFlow = createApiBuilderFromCtpClient(clientWithAnonymousSessionFlow).withProjectKey({
  projectKey: getEnvVariable(EnvVars.project_key),
});

const apiRootWithPasswordFlow = (email: string, password: string) =>
  createApiBuilderFromCtpClient(clientWithPasswordFlow(email, password)).withProjectKey({
    projectKey: getEnvVariable(EnvVars.project_key),
  });

export { apiRootWithAnonymousSessionFlow, apiRootWithPasswordFlow };
