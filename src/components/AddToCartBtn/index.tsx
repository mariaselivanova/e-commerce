import React, { FC, useContext, useEffect, useState } from 'react';
import { Typography, Button, Stack, IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import { addItemToCart, getCartById, removeItemFromCart } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserContext } from '../../contexts/userContext';
import { makeItemRemovedMessage, makeItemAddedMessage } from '../../utils/user-messages';

import { UserMessage } from '../UserMessage';
import { Preloader } from '../Preloader';

import styles from './AddToCartBtn.module.css';

interface IAddToCartBtnProps {
  productId: string;
  quantity: number;
  setSuccessMessage: (message: string) => void;
}

export const AddToCartBtn: FC<IAddToCartBtnProps> = ({ productId, quantity, setSuccessMessage }) => {
  const [amount, setAmount] = useState(quantity);
  const { errorState, closeError, handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setAmount(quantity);
  }, [quantity]);

  const addProduct = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    setSuccessMessage('');
    e.stopPropagation();
    setIsLoading(true);

    try {
      const {
        body: { id, version },
      } = await getCartById(user.cart);

      const {
        body: { totalLineItemQuantity, lineItems },
      } = await addItemToCart(id, version, productId);

      if (totalLineItemQuantity) {
        user.setProductQuantity(totalLineItemQuantity);
      }

      const currentItem = lineItems.find((item) => item.productId === productId);
      setSuccessMessage(makeItemAddedMessage(currentItem?.name['en-US'] || 'Item'));
      setAmount((prev) => prev + 1);
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    setSuccessMessage('');
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
        setSuccessMessage(makeItemRemovedMessage(currentProduct.name['en-US']));
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.preloader}>
        <Preloader />
      </div>
    );
  }

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      {amount < 1 ? (
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
