import React, { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';

import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { CatalogPage } from '../../pages/CatalogPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { Header } from '../Header';
import { ProtectedRoute } from '../ProtectedRoute';
import { Footer } from '../Footer';
import { ProductPage } from '../../pages/ProductPage';
import { catalogRoute, loginRoute, mainRoute, profileRoute, registerRoute } from '../../utils/routes';

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
        <Route path={mainRoute} element={<MainPage />} />
        <Route path={catalogRoute} element={<CatalogPage />} />
        <Route path={`${catalogRoute}/:productKey`} element={<ProductPage />} />
        <Route path={profileRoute} element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path={loginRoute} element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
        <Route path={registerRoute} element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
};
