import React, { FC, useContext } from 'react';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

import { Cart } from '@commercetools/platform-sdk';
import { deleteCart } from '../../sdk/requests';

import { UserContext } from '../../contexts/userContext';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { CartTableItem } from '../CartTableItem';

import styles from './CartTable.module.css';
import { PriceDisplay } from '../PriceDisplay';

interface CartTableProps {
  myCart?: Cart;
}

const tableHead = ['Image', 'Name', 'Quantity', 'Price'];

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

  const calculateTotalPrice = (): number => {
    let totalPrice = 0;
    myCart?.lineItems.forEach((item) => {
      totalPrice += item.totalPrice.centAmount;
    });
    return totalPrice;
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
          {myCart?.lineItems.map((item) => <CartTableItem key={item.productKey} item={item} />)}
          <TableRow className={styles.item}>
            <TableCell />
            <TableCell align='center'>Discount name</TableCell>
            <TableCell align='center'>Total:</TableCell>
            <TableCell align='center'>
              <PriceDisplay initialPrice={myCart?.totalPrice.centAmount} discountedPrice={calculateTotalPrice() * 0.85} size='large' />
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
