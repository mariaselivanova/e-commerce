import React, { FC, useContext, useState } from 'react';
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
}

export const AddToCartBtn: FC<IAddToCartBtnProps> = ({ productId }) => {
  const [amount, setAmount] = useState(0);
  const { errorState, closeError, handleError } = useErrorHandling();
  const user = useContext(UserContext);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    getCartById(user.cart)
      .then(({ body: { id, version } }) => {
        addItemToCart(id, version, productId);
        setAmount(1);
      })
      .catch(handleError);
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    getCartById(user.cart)
      .then(({ body: { id, version } }) => {
        addItemToCart(id, version, productId);
        setAmount((prev) => prev + 1);
      })
      .catch(handleError);
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    getCartById(user.cart)
      .then(({ body: { id, version, lineItems } }) => {
        const currentProduct = lineItems.find((item) => item.productId === productId);
        if (currentProduct) {
          removeItemFromCart(id, version, currentProduct.id);
          setAmount((prev) => prev - 1);
        }
      })
      .catch(handleError);
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      {amount < 1 ? (
        <Button className={styles.addBtn} onClick={handleAddToCart}>
          Add to cart
        </Button>
      ) : (
        <Stack direction='row' className={styles.amount}>
          <IconButton onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <Typography>{amount}</Typography>
          <IconButton onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Stack>
      )}
    </>
  );
};
