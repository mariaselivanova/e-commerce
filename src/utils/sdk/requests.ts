import { apiRoot } from './root';

export const login = () => {
  return apiRoot
    .login()
    .post({
      body: {
        email: 'test123@mail.com',
        password: 'password',
      },
    })
    .execute();
};

export const createCustomer = () => {
  return apiRoot
    .customers()
    .post({
      body: {
        email: 'blablabla@example.com',
        password: 'examplePassword',
      },
    })
    .execute();
};
