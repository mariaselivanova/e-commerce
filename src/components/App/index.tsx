import React, { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';

import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { ProtectedRoute } from '../ProtectedRoute';
import { Footer } from '../Footer';

export const App: FC = () => {
  const [name, setName] = useState<string | null>(localStorage.getItem('user') ?? null);

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
      <Footer />
    </UserContext.Provider>
  );
};
