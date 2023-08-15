export enum EnvVars {
  auth_url = 'REACT_APP_AUTH_URL',
  api_url = 'REACT_APP_API_URL',
  project_key = 'REACT_APP_PROJECT_KEY',
  client_id = 'REACT_APP_CLIENT_ID',
  client_secret = 'REACT_APP_CLIENT_SECRET',
  scopes = 'REACT_APP_SCOPES',
}

export interface UserSubmitForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  date: Date;

  billing_street: string;
  billing_city: string;
  billing_postal: string;
  billing_country: string;

  sameAddress: boolean | undefined;
  defaultBilling: boolean | undefined;
  defaultShipping: boolean | undefined;

  shipping_street?: string | undefined;
  shipping_city?: string | undefined;
  shipping_postal?: string | undefined;
  shipping_country?: string | undefined;
}
