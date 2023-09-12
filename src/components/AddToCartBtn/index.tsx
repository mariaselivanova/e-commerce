import React, { FC, useContext, useEffect, useState } from 'react';
import { Typography, Button, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { addItemToCart, getCartById, removeItemFromCart } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserContext } from '../../contexts/userContext';

import { UserMessage } from '../UserMessage';

import styles from './AddToCartBtn.module.css';

interface IAddToCartBtnProps {
  productId: string;
  quantity: number;
}

export const AddToCartBtn: FC<IAddToCartBtnProps> = ({ productId, quantity }) => {
  const [amount, setAmount] = useState(quantity);
  const { errorState, closeError, handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setAmount(quantity);
  }, [quantity]);

  const addProduct = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setIsLoading(true);
    e.stopPropagation();
    setTimeout(() => {
      getCartById(user.cart)
        .then(({ body: { id, version } }) => {
          addItemToCart(id, version, productId);
          setAmount((prev) => prev + 1);
        })
        .finally(() => setIsLoading(false))
        .catch(handleError);
    }, 300);
  };

  const removeProduct = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setIsLoading(true);
    e.stopPropagation();
    setTimeout(() => {
      getCartById(user.cart)
        .then(({ body: { id, version, lineItems } }) => {
          const currentProduct = lineItems.find((item) => item.productId === productId);

          if (currentProduct) {
            removeItemFromCart(id, version, currentProduct.id);
            setAmount((prev) => prev - 1);
          }
        })
        .finally(() => setIsLoading(false))
        .catch(handleError);
    }, 300);
  };

  if (isLoading) {
    return <Button disabled={true} className={styles.loadingIndicator} />;
  }

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      {amount < 1 ? (
        <Button className={styles.addBtn} onClick={addProduct}>
          Add to cart
        </Button>
      ) : (
        <Stack direction='row' className={styles.amount}>
          <IconButton onClick={removeProduct}>
            <RemoveIcon />
          </IconButton>
          <Typography>{amount}</Typography>
          <IconButton onClick={addProduct}>
            <AddIcon />
          </IconButton>
        </Stack>
      )}
    </>
  );
};
