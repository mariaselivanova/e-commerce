import dayjs from 'dayjs';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { ProfileEditInfoModal } from '../../utils/types';
import { rootClient } from '../client';

export const updateCustomerInfo = (data: ProfileEditInfoModal, id: string, version: number): Promise<ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'setFirstName',
            firstName: data.firstname,
          },
          {
            action: 'setLastName',
            lastName: data.lastname,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth: dayjs(data.date).format('YYYY-MM-DD'),
          },
          {
            action: 'changeEmail',
            email: data.email,
          },
        ],
      },
    })
    .execute();

export const updateCustomerPassword = (
  currentPassword: string,
  newPassword: string,
  id: string,
  version: number,
): Promise<void | ClientResponse<Customer>> =>
  rootClient.apiClient
    .customers()
    .password()
    .post({
      body: {
        id,
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();
