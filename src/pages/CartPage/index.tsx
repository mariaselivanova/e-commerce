import React, { FC, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';

import { getCartById } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { RouteLinks } from '../../utils/types';

import { UserMessage } from '../../components/UserMessage';
import { CartTable } from '../../components/CartTable';

import styles from './CartPage.module.css';

export const CartPage: FC = () => {
  const { errorState, closeError, handleError } = useErrorHandling();

  const [myCart, setMyCart] = useState<Cart | null>(null);
  const user = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState('');
  const { windowWidth } = useWindowWidth();

  useEffect(() => {
    closeError();
    if (user.cart) {
      getCartById(user.cart)
        .then(({ body }) => {
          setMyCart(body);
        })
        .catch(handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.cart, user.productQuantity]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      {!!successMessage && (
        <UserMessage severity='success' open={!!successMessage} onClose={(): void => setSuccessMessage('')}>
          {successMessage}
        </UserMessage>
      )}
      <Typography gutterBottom variant={windowWidth < 800 ? 'h5' : 'h4'}>
        Your Cart
      </Typography>
      {myCart?.lineItems.length ? (
        <CartTable myCart={myCart} setSuccessMessage={setSuccessMessage} handleError={handleError} setMyCart={setMyCart} />
      ) : (
        <Container className={styles.noProducts}>
          <Typography variant='h5' component='h5'>
            No products!{' '}
          </Typography>
          <Link to={RouteLinks.Catalog}>
            <Button className={styles.toCatalog} variant='contained' color='primary'>
              To catalog...
            </Button>
          </Link>
        </Container>
      )}
    </>
  );
};
