import React, { FC, useEffect, useState, useContext } from 'react';

import { Button, Typography, Container } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';
import { getCartById } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';

import { useErrorHandling } from '../../hooks/useErrorHandling';

import { RouteLinks } from '../../utils/types';

import { UserMessage } from '../../components/UserMessage';
import { CartTable } from '../../components/CartTable';

import styles from './CartPage.module.css';

export const CartPage: FC = () => {
  const { errorState, closeError, handleError } = useErrorHandling();

  const [myCart, setMyCart] = useState<Cart | null>(null);
  const user = useContext(UserContext);

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
  }, [user.cart]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Typography gutterBottom variant='h4'>
        Your Cart
      </Typography>
      {myCart?.lineItems.length ? (
        <CartTable myCart={myCart} setMyCart={setMyCart} />
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
