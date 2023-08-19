export enum EnvVars {
  auth_url = 'REACT_APP_AUTH_URL',
  api_url = 'REACT_APP_API_URL',
  project_key = 'REACT_APP_PROJECT_KEY',
  client_id = 'REACT_APP_CLIENT_ID',
  client_secret = 'REACT_APP_CLIENT_SECRET',
  scopes = 'REACT_APP_SCOPES',
}

export interface LoginUserSubmitForm {
  email: string;
  password: string;
}
