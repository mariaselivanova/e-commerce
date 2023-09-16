import React, { FC, useContext, useEffect, useState } from 'react';
import { Typography, Button, Stack, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { addItemToCart, getCartById, removeItemFromCart } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserContext } from '../../contexts/userContext';

import { UserMessage } from '../UserMessage';

import styles from './AddToCartBtn.module.css';

interface IAddToCartBtnProps {
  productId: string;
  quantity: number;
  isInCart?: boolean;
}

export const AddToCartBtn: FC<IAddToCartBtnProps> = ({ productId, quantity, isInCart }) => {
  const [amount, setAmount] = useState(quantity);
  const { errorState, closeError, handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setAmount(quantity);
  }, [quantity]);

  const addProduct = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      const {
        body: { id, version },
      } = await getCartById(user.cart);

      const {
        body: { totalLineItemQuantity },
      } = await addItemToCart(id, version, productId);

      if (totalLineItemQuantity) {
        user.setProductQuantity(totalLineItemQuantity);
      }

      setAmount((prev) => prev + 1);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      const {
        body: { id, version, lineItems },
      } = await getCartById(user.cart);

      const currentProduct = lineItems.find((item) => item.productId === productId);

      if (currentProduct) {
        const {
          body: { totalLineItemQuantity },
        } = await removeItemFromCart(id, version, currentProduct.id);

        if (totalLineItemQuantity) {
          user.setProductQuantity(totalLineItemQuantity);
        } else {
          user.setProductQuantity(0);
        }

        setAmount((prev) => prev - 1);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
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
      {amount < 1 && !isInCart ? (
        <Button variant='outlined' className={styles.addBtn} onClick={addProduct}>
          Add to cart
        </Button>
      ) : (
        <Stack direction='row' className={styles.amount}>
          <IconButton onClick={removeProduct}>
            <RemoveRoundedIcon />
          </IconButton>
          <Typography>{amount}</Typography>
          <IconButton onClick={addProduct}>
            <AddRoundedIcon />
          </IconButton>
        </Stack>
      )}
    </>
  );
};
