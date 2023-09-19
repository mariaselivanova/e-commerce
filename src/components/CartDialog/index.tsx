import React, { FC, useContext } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';

import { deleteCart, getCartById, removeItemFromCart } from '../../sdk/requests';
import { makeItemsRemovedMessage } from '../../utils/user-messages';
import { UserContext } from '../../contexts/userContext';

interface CartDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  myCart?: Cart;
  handleError: (error: Error) => void;
  isSingleItem: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: string;
  setSuccessMessage: (message: string) => void;
}

export const CartDialog: FC<CartDialogProps> = ({ open, setOpen, myCart, handleError, isSingleItem, setIsLoading, productId, setSuccessMessage }) => {
  const message = `Are you sure you want to ${isSingleItem ? `remove this item` : `clear cart`}?`;
  const user = useContext(UserContext);
  const handleDialogClose = (): void => {
    setOpen(false);
  };

  const handleRemoveCart = (): void => {
    if (setIsLoading) {
      setIsLoading(true);
      if (myCart) {
        deleteCart(myCart.id, myCart.version)
          .then(() => {
            localStorage.removeItem('cart');
            user.setCart('');
            setSuccessMessage('Cart successfully cleared!');
          })
          .catch(handleError);
      }
      setOpen(false);
    }
  };

  const removeAllProducts = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (setIsLoading) {
      e.stopPropagation();
      setIsLoading(true);

      try {
        const {
          body: { id, version, lineItems },
        } = await getCartById(user.cart);

        const currentProduct = lineItems.find((lineItem) => lineItem.productId === productId);

        if (currentProduct) {
          const {
            body: { totalLineItemQuantity },
          } = await removeItemFromCart(id, version, currentProduct.id, currentProduct.quantity);

          if (totalLineItemQuantity) {
            user.setProductQuantity(totalLineItemQuantity);
          } else {
            user.setProductQuantity(0);
          }
          setSuccessMessage(makeItemsRemovedMessage(currentProduct.name['en-US']));
        }
      } catch (error) {
        handleError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={handleDialogClose} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={isSingleItem ? removeAllProducts : handleRemoveCart} autoFocus variant='contained'>
          {isSingleItem ? `Remove!` : `Clear!`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
