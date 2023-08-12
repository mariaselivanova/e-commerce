import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

export const LoginPage: FC = () => (
  <>
    <Typography variant='h2' component='h2'>
      Login Page
    </Typography>
    <Stack spacing={1} direction='row'>
      <Typography>New Customer?</Typography>
      <Link to='/register'>
        <Typography>Create an account</Typography>
      </Link>
    </Stack>
  </>
);
