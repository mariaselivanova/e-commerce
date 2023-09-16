import React, { FC, useContext } from 'react';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

import { Cart } from '@commercetools/platform-sdk';
import { deleteCart } from '../../sdk/requests';

import { UserContext } from '../../contexts/userContext';
import { CartTableItem } from '../CartTableItem';

import styles from './CartTable.module.css';
import { PriceDisplay } from '../PriceDisplay';

interface CartTableProps {
  myCart?: Cart;
  setSuccessMessage: (message: string) => void;
  handleError: (error: Error) => void;
}

const tableHead = ['Image', 'Name', 'Quantity', 'Price'];

export const CartTable: FC<CartTableProps> = ({ myCart, setSuccessMessage, handleError }) => {
  const user = useContext(UserContext);

  const handleRemoveCart = (): void => {
    if (myCart) {
      deleteCart(myCart.id, myCart.version)
        .then(() => {
          localStorage.removeItem('cart');
          user.setCart('');
        })
        .catch(handleError);
    }
  };

  return (
    <TableContainer className={styles.cart}>
      <Table>
        <TableHead className={styles.head}>
          <TableRow>
            {tableHead.map((item) => (
              <TableCell key={item} align='center'>
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
            <TableCell />
            <TableCell align='center'>Discount name</TableCell>
            <TableCell align='center'>Total:</TableCell>
            <TableCell align='center'>
              <PriceDisplay
                initialPrice={myCart?.totalPrice.centAmount}
                discountedPrice={myCart?.totalPrice && myCart.totalPrice.centAmount * 0.85}
                size='large'
              />
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
      <Button variant='contained' className={styles.clear} onClick={handleRemoveCart}>
        Clear
      </Button>
    </TableContainer>
  );
};
