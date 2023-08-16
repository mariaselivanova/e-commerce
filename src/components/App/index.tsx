import React, { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';

import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { ProtectedRoute } from '../ProtectedRoute';

export const App: FC = () => {
  // user is authorized.
  // const user = { name: 'Иннокентий' };

  // user is not authorized.
  const [name, setName] = useState<string | null>(null);

  const user = {
    name,
    setName,
  };

  return (
    <UserContext.Provider value={user}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
        <Route path='/register' element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};
