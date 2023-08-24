import React, { FC, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import { getMe } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../../components/UserMessage';

interface IUserState {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email: string;
}

export const ProfilePage: FC = () => {
  const [user, setUser] = useState<IUserState>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  });

  const { errorState, closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    getMe()
      .then(({ body: { firstName, lastName, dateOfBirth, email } }: ClientResponse<Customer>) => {
        setUser({ firstName, lastName, dateOfBirth, email });
      })
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Stack spacing={4}>
        {Object.entries(user).map(([key, value]) => (
          <Typography key={key} variant='h5'>
            {key}: {value}
          </Typography>
        ))}
      </Stack>
    </>
  );
};
