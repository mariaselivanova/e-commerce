import React, { FC, useContext, useEffect, useState } from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Stack,
  Alert,
  Snackbar,
  AlertProps,
} from '@mui/material';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Cart, DiscountCode } from '@commercetools/platform-sdk';
import { addDiscount, deleteCart, getCartById, getDiscountCodes } from '../../sdk/requests';

import { UserContext } from '../../contexts/userContext';
import { CartTableItem } from '../CartTableItem';

import styles from './CartTable.module.css';
import { PriceDisplay } from '../PriceDisplay';
import { useWindowWidth } from '../../hooks/useWindowWidth';

interface CartTableProps {
  myCart?: Cart;
  setSuccessMessage: (message: string) => void;
  handleError: (error: Error) => void;
  setMyCart: React.Dispatch<React.SetStateAction<Cart | null>>;
}

const tableHead = ['Product', 'Name', 'Quantity', 'Price'];

export const CartTable: FC<CartTableProps> = ({ myCart, setSuccessMessage, handleError, setMyCart }) => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getDiscountCodes()
      .then((data) => {
        const { results } = data.body;
        const activeCodes = results.filter((item) => item.isActive);
        setDiscountCodes(activeCodes);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [handleError]);

  const handleCloseSnackbar = (): void => setSnackbar(null);

  const handleDialogOpen = (): void => {
    setOpen(true);
  };

  const handleDialogClose = (): void => {
    setOpen(false);
  };
  const { windowWidth } = useWindowWidth();

  const handleRemoveCart = (): void => {
    if (myCart) {
      deleteCart(myCart.id, myCart.version)
        .then(() => {
          localStorage.removeItem('cart');
          user.setCart('');
        })
        .catch(handleError);
    }
    setOpen(false);
  };

  const onSubmitHandler: SubmitHandler<FieldValues> = async (value): Promise<void> => {
    const { code } = value;
    const foundCode = discountCodes.find((item) => item.code === code);
    try {
      if (foundCode) {
        if (myCart) {
          await addDiscount(myCart.id, foundCode.code, myCart.version);
          reset();
          if (user.cart) {
            getCartById(user.cart)
              .then(({ body }) => {
                setMyCart(body);
              })
              .catch(handleError);
          }
          setSnackbar({ children: 'Discount applied successfully!', severity: 'success' });
        }
      } else {
        setSnackbar({ children: 'No such discount code!', severity: 'error' });
      }
    } catch (err) {
      handleError(err as Error);
    }
  };

  const calculateTotalPrice = (): number => {
    let totalPrice = 0;
    myCart?.lineItems.forEach((item) => {
      totalPrice += item.price.value.centAmount * item.quantity;
    });
    return totalPrice;
  };

  return (
    <TableContainer className={styles.cart}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Table>
          <TableHead className={styles.head}>
            <TableRow>
              {tableHead.map((item) => (
                <TableCell key={item} align='center' className={item === 'Name' ? styles.nameColumn : undefined}>
                  {item}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {myCart?.lineItems.map((item) => (
              <CartTableItem key={item.productKey} item={item} setSuccessMessage={setSuccessMessage} handleError={handleError} />
            ))}
            <TableRow className={styles.item}>
              <TableCell colSpan={windowWidth > 470 ? 2 : 1} align='center' className={styles.promocodeWrapper}>
                <Stack className={styles.promocode} direction={windowWidth > 600 ? 'row' : 'column'} spacing={2}>
                  <TextField className={styles.codeInput} {...register('code')} type='text' label={'Discount code'} />
                  <Button className={styles.apply} variant='outlined' color='primary' type='submit'>
                    Apply code
                  </Button>
                </Stack>
              </TableCell>
              <TableCell align='center'>Total:</TableCell>
              <TableCell>
                <PriceDisplay
                  initialPrice={calculateTotalPrice()}
                  discountedPrice={calculateTotalPrice() === myCart?.totalPrice.centAmount ? undefined : myCart?.totalPrice.centAmount}
                  size={windowWidth > 800 ? 'large' : 'small'}
                  directionRow={windowWidth > 1000}
                />
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </form>

      <Button variant='contained' className={styles.clear} onClick={handleDialogOpen}>
        Clear
      </Button>

      <Dialog open={open} onClose={handleDialogClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle>Are you sure you want to remove all items from your cart?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleRemoveCart} autoFocus variant='contained'>
            Clear cart!
          </Button>
        </DialogActions>
      </Dialog>

      {!!snackbar && (
        <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </TableContainer>
  );
};
