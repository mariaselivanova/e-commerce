import React, { FC, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserContext } from '../../contexts/userContext';
import { RouteLinks } from '../../utils/types';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { createCart, getCartById } from '../../sdk/requests';

import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { CatalogPage } from '../../pages/CatalogPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { ProductPage } from '../../pages/ProductPage';
import { Header } from '../Header';
import { ProtectedRoute } from '../ProtectedRoute';
import { Footer } from '../Footer';
import { AppBreadcrumbs } from '../AppBreadcrumbs';
import { AboutUs } from '../../pages/AboutUs';
import { CartPage } from '../../pages/CartPage';
import { UserMessage } from '../UserMessage';

export const App: FC = () => {
  const [name, setName] = useState<string | null>(localStorage.getItem('user') ?? null);
  const [cart, setCart] = useState<string>(localStorage.getItem('cart') ?? '');
  const [productQuantity, setProductQuantity] = useState(0);

  const { errorState, closeError, handleError } = useErrorHandling();

  const user = {
    name,
    setName,
    cart,
    setCart,
    productQuantity,
    setProductQuantity,
  };

  useEffect(() => {
    closeError();

    if (!cart) {
      createCart()
        .then(({ body: { id } }) => {
          setCart(id);
          setProductQuantity(0);
          localStorage.setItem('cart', id);
        })
        .catch(handleError);
    } else {
      getCartById(cart)
        .then(({ body: { totalLineItemQuantity } }) => {
          if (totalLineItemQuantity) {
            setProductQuantity(totalLineItemQuantity);
          }
        })
        .catch(() => {
          localStorage.removeItem('cart');
          setCart('');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <UserContext.Provider value={user}>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Header />
      <AppBreadcrumbs />
      <Routes>
        <Route path={RouteLinks.About} element={<AboutUs />} />
        <Route path={RouteLinks.Main} element={<MainPage />} />
        <Route path={RouteLinks.Catalog} element={<CatalogPage />} />
        <Route path={`${RouteLinks.Catalog}/:productKey`} element={<ProductPage />} />
        <Route path={RouteLinks.Profile} element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path={RouteLinks.Login} element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />} />
        <Route path={RouteLinks.Register} element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />} />
        <Route path={RouteLinks.Cart} element={<CartPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
};
