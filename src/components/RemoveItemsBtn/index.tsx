import React, { FC, useContext, useState } from 'react';
import { IconButton } from '@mui/material';

import { getCartById, removeItemFromCart } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { SUCCESS_MESSAGE_REMOVE_ALL } from '../../utils/user-messages';

import { UserMessage } from '../UserMessage';

import trashBin from '../../assets/icons/trash-bin.svg';
import styles from './RemoveItemsBtn.module.css';

interface IRemoveItemsBtnProps {
  itemId: string;
  setSuccessMessage: (message: string) => void;
}

export const RemoveItemsBtn: FC<IRemoveItemsBtnProps> = ({ itemId, setSuccessMessage }) => {
  const user = useContext(UserContext);
  const { errorState, closeError, handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);

  const removeAllProducts = async (): Promise<void> => {
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const {
        body: { id, version, lineItems },
      } = await getCartById(user.cart);

      const currentProduct = lineItems.find((item) => item.productId === itemId);

      if (currentProduct) {
        const {
          body: { totalLineItemQuantity },
        } = await removeItemFromCart(id, version, currentProduct.id, currentProduct.quantity);

        if (totalLineItemQuantity) {
          user.setProductQuantity(totalLineItemQuantity);
        } else {
          user.setProductQuantity(0);
        }
        setSuccessMessage(SUCCESS_MESSAGE_REMOVE_ALL);
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loadingIndicator} />;
  }

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <IconButton onClick={removeAllProducts}>
        <img className={styles.trashBin} src={trashBin} alt='remove product' />
      </IconButton>
    </>
  );
};
