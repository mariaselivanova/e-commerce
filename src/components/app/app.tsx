import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import MainPage from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import NotFoundPage from '../../pages/not-found-page';
import Header from '../header/header';
import ProtectedRoute from '../protected-route/protected-route';

const App: FC = () => {
  // user is authorized.
  // const user = { name: 'Иннокентий' };

  // user is not authorized.
  const user = null;

  return (
    <UserContext.Provider value={user}>
      <Header></Header>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
        <Route path='/register' element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />} />
        <Route path='/*' element={<NotFoundPage />}></Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
