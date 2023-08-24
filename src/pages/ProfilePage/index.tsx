import React, { FC, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import { getMe } from '../../sdk/requests';

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

  useEffect(() => {
    getMe().then(({ body: { firstName, lastName, dateOfBirth, email } }: ClientResponse<Customer>) => {
      setUser({ firstName, lastName, dateOfBirth, email });
    });
  }, []);

  return (
    <Stack spacing={4}>
      {Object.entries(user).map(([key, value]) => (
        <Typography key={key} variant='h5'>
          {key}: {value}
        </Typography>
      ))}
    </Stack>
  );
};
