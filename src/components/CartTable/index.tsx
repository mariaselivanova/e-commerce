import React, { FC, useContext } from 'react';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

import { Cart } from '@commercetools/platform-sdk';
import { deleteCart } from '../../sdk/requests';

import { UserContext } from '../../contexts/userContext';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { CartTableItem } from '../CartTableItem';

import styles from './CartTable.module.css';

interface CartTableProps {
  myCart?: Cart;
}

export const CartTable: FC<CartTableProps> = ({ myCart }) => {
  const user = useContext(UserContext);
  const { handleError } = useErrorHandling();

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

  const calculateTotalPrice = (): string => {
    let totalPrice = 0;
    myCart?.lineItems.forEach((item) => {
      totalPrice += item.totalPrice.centAmount / 100;
    });
    return `${totalPrice}$`;
  };
  return (
    <TableContainer className={styles.cart}>
      <Table>
        <TableHead className={styles.head}>
          <TableRow>
            <TableCell align='center'>Image</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Quantity</TableCell>
            <TableCell align='center'>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myCart?.lineItems.map((item) => <CartTableItem key={item.productKey} item={item} />)}
          <TableRow className={styles.item}>
            <TableCell />
            <TableCell />
            <TableCell align='center'>Total:</TableCell>
            <TableCell align='center'>{calculateTotalPrice()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant='contained' className={styles.clear} onClick={handleRemoveCart}>
        Clear
      </Button>
    </TableContainer>
  );
};
