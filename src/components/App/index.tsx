import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';

import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { ProtectedRoute } from '../ProtectedRoute';

import { Button, Typography, TextField, Box } from '@mui/material';

export const App: FC = () => {
  // user is authorized.
  // const user = { name: 'Иннокентий' };

  // user is not authorized.
  const user = null;

  return (
    <UserContext.Provider value={user}>
      <Header></Header>
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
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
        <Route path='/register' element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />} />
        <Route path='/*' element={<NotFoundPage />}></Route>
      </Routes>
    </UserContext.Provider>
  );
};
