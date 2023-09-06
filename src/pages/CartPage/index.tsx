import React, { FC, useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserMessage } from '../../components/UserMessage';
import { getCart, deleteCart, createCart } from '../../sdk/requests';

export const CartPage: FC = () => {
  const { errorState, closeError, handleError } = useErrorHandling();
  const [cart, setCart] = useState<Cart>();
  const [isEmptyCartPressed, setIsEmptyCartPressed] = useState(false);

  useEffect(() => {
    closeError();

    getCart()
      .then((data) => {
        setCart(data.body);
      })
      .catch(handleError);

    if (isEmptyCartPressed && cart !== undefined) {
      deleteCart(cart.id, cart.version)
        .then(() => {
          setIsEmptyCartPressed(false);
          createCart();
        })
        .catch(handleError);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmptyCartPressed]);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Typography variant='h4'>Cart</Typography>
      {cart && cart.lineItems.at(0) ? (
        <Stack>
          Here will be the code for showing products: You have in cart {cart.lineItems.at(0)?.name['en-US']} {cart.lineItems.at(0)?.quantity} items
          <Button onClick={(): void => setIsEmptyCartPressed(true)}>emptyCart</Button>
        </Stack>
      ) : (
        'No products'
      )}
    </>
  );
};
