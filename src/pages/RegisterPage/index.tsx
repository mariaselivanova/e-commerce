import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

export const RegisterPage: FC = () => {
  return (
    <>
      <Typography variant='h2' component='h2'>
        Register Page
      </Typography>
      <Stack spacing={1} direction='row'>
        <Typography>Already have an account?</Typography>
        <Link to='/login'>
          <Typography>Log in</Typography>
        </Link>
      </Stack>
    </>
  );
};
