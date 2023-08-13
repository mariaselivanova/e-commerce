import React, { FC } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';

export const MainPage: FC = () => (
  <div>
    <Typography variant='h3' gutterBottom>
      Here is our Main Page and test buttons and inputs
    </Typography>
    <Box component='form' noValidate autoComplete='off'>
      <TextField variant='outlined' id='no-error-input' label='No error' defaultValue='No error input' />
      <TextField variant='outlined' error id='error-input' label='Error' defaultValue='Error input' helperText='Incorrect entry.' />
      <Button variant='contained'>React cats</Button>
    </Box>
  </div>
);
