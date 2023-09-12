import React, { FC, useEffect, useState, useContext } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { getCartById, deleteCart } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';

import { UserMessage } from '../../components/UserMessage';

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

  const handleRemoveCart = (): void => {
    if (myCart) {
      deleteCart(myCart.id, myCart.version)
        .then(() => {
          localStorage.removeItem('cart');
          user.setCart('');
        })
        .catch(handleError);
    }
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Typography gutterBottom variant='h4'>
        Cart
      </Typography>
      {myCart ? (
        <Stack>
          <Typography gutterBottom>CART ID: {user.cart}</Typography>
          {myCart.lineItems.map((item) => (
            <Stack direction='row' justifyContent='space-between' key={item.productKey}>
              <Typography>{item.productKey}</Typography>
              <Typography>quantity:{item.quantity}</Typography>
            </Stack>
          ))}
          <Button onClick={handleRemoveCart}>emptyCart</Button>
        </Stack>
      ) : (
        'No products'
      )}
    </>
  );
};
