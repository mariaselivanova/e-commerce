import React, { FC, useContext } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';
import { UserContext } from '../../contexts/userContext';

export const MainPage: FC = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <Typography variant='h3' gutterBottom>
        Here is our Main Page and test buttons and inputs
      </Typography>
      <Typography variant='h3' gutterBottom>
        {`User is ${user.name}`}
      </Typography>
      <Box component='form' noValidate autoComplete='off'>
        <TextField variant='outlined' id='no-error-input' label='No error' defaultValue='No error input' />
        <TextField variant='outlined' error id='error-input' label='Error' defaultValue='Error input' helperText='Incorrect entry.' />
        <Button variant='contained'>React cats</Button>
      </Box>
    </div>
  );
};
