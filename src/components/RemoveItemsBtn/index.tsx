import React, { FC, useState } from 'react';
import { IconButton } from '@mui/material';

import { Cart } from '@commercetools/platform-sdk';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../UserMessage';
import { CartDialog } from '../CartDialog';
import { Preloader } from '../Preloader';

import trashBin from '../../assets/icons/trash-bin.svg';
import styles from './RemoveItemsBtn.module.css';

interface IRemoveItemsBtnProps {
  itemId: string;
  cart?: Cart;
}

export const RemoveItemsBtn: FC<IRemoveItemsBtnProps> = ({ cart, itemId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { errorState, closeError, handleError } = useErrorHandling();

  const handleDialogOpen = (): void => {
    setOpen(true);
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      {isLoading ? (
        <Preloader />
      ) : (
        <IconButton onClick={handleDialogOpen}>
          <img className={styles.trashBin} src={trashBin} alt='remove product' />
        </IconButton>
      )}
      <CartDialog
        open={open}
        setOpen={setOpen}
        myCart={cart}
        handleError={handleError}
        setIsLoading={setIsLoading}
        productId={itemId}
        isSingleItem={true}
      />
    </>
  );
};
