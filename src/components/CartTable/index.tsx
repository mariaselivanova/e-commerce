import React, { FC, useContext, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Stack,
  Alert,
  Snackbar,
  AlertProps,
} from '@mui/material';

import { Cart, DiscountCode } from '@commercetools/platform-sdk';
import { addDiscount, getCartById, getDiscountCodes } from '../../sdk/requests';

import { useWindowWidth } from '../../hooks/useWindowWidth';
import { UserContext } from '../../contexts/userContext';

import { CartTableItem } from '../CartTableItem';
import { PriceDisplay } from '../PriceDisplay';
import { CartDialog } from '../CartDialog';

import styles from './CartTable.module.css';

interface CartTableProps {
  myCart?: Cart;
  setSuccessMessage: (message: string) => void;
  handleError: (error: Error) => void;
  setMyCart: React.Dispatch<React.SetStateAction<Cart | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const tableHead = ['Product', 'Name', 'Quantity', 'Item price', 'Total price'];

export const CartTable: FC<CartTableProps> = ({ myCart, setSuccessMessage, handleError, setMyCart, setIsLoading }) => {
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

  const { windowWidth } = useWindowWidth();

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

  const setClassName = (item: string): string | undefined => {
    if (item === 'Name') {
      return styles.nameColumn;
    }

    if (item === 'Item price') {
      return styles.itemColumn;
    }

    return undefined;
  };

  return (
    <TableContainer className={styles.cart}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Table>
          <TableHead className={styles.head}>
            <TableRow>
              {tableHead.map((item) => (
                <TableCell key={item} align='center' className={setClassName(item)}>
                  {item}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {myCart?.lineItems.map((item) => (
              <CartTableItem key={item.productKey} myCart={myCart} item={item} setSuccessMessage={setSuccessMessage} handleError={handleError} />
            ))}
            <TableRow className={styles.item}>
              <TableCell colSpan={windowWidth > 750 ? 2 : 1} align='center' className={styles.promocodeWrapper}>
                <Stack className={styles.promocode} direction={windowWidth > 750 ? 'row' : 'column'} spacing={2}>
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
                  size={windowWidth > 1101 ? 'large' : 'small'}
                  directionRow={windowWidth > 1101}
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
      <Button variant='contained' className={styles.clear}>
        Checkout
      </Button>

      <CartDialog
        setIsLoading={setIsLoading}
        setSuccessMessage={setSuccessMessage}
        open={open}
        setOpen={setOpen}
        myCart={myCart}
        handleError={handleError}
        isSingleItem={false}
      />

      {!!snackbar && (
        <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </TableContainer>
  );
};
