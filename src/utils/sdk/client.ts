import fetch from 'node-fetch';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = 'e-commerce_react-cats';
const scopes = [
  'view_categories:e-commerce_react-cats',
  'manage_my_orders:e-commerce_react-cats',
  'manage_my_quote_requests:e-commerce_react-cats',
  'manage_my_payments:e-commerce_react-cats',
  'manage_my_business_units:e-commerce_react-cats',
  'manage_my_quotes:e-commerce_react-cats',
  'create_anonymous_token:e-commerce_react-cats',
  'manage_my_profile:e-commerce_react-cats',
  'manage_my_shopping_lists:e-commerce_react-cats',
  'view_published_products:e-commerce_react-cats',
  'manage_customers:e-commerce_react-cats',
];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: 'aB1NnNpvJufJ8ceC8BhJKnA0',
    clientSecret: 'OxHuRo61dXSrU3B7DSMAV3YsldTKtlNB',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
