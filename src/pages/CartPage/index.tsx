import React, { FC, useEffect, useState, useContext } from 'react';
import { Button, Typography, TableContainer, TableCell, TableHead, TableRow, TableBody, Table } from '@mui/material';
import { Cart } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserMessage } from '../../components/UserMessage';
import { getCartById, deleteCart } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';

import { RouteLinks } from '../../utils/types';
import styles from './CartPage.module.css';

export const CartPage: FC = () => {
  const { errorState, closeError, handleError } = useErrorHandling();
  const [myCart, setMyCart] = useState<Cart | null>(null);
  const user = useContext(UserContext);

  useEffect(() => {
    closeError();
    if (user.cart) {
      getCartById(user.cart)
        .then(({ body }) => {
          setMyCart(body);
        })
        .catch(handleError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.cart]);

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

  const normalizeName = (name: string): string => {
    if (!name) {
      return 'N/A';
    }

    return name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Typography gutterBottom variant='h4'>
        Your Cart
      </Typography>
      {myCart?.lineItems.length ? (
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
              {myCart.lineItems.map((item) => (
                <TableRow className={styles.item} key={item.productKey}>
                  <TableCell align='center'>
                    <img className={styles.image} src={item.variant.images ? item.variant.images[0].url : ''} />
                  </TableCell>
                  <TableCell align='center'>{normalizeName(item.name['en-US'])}</TableCell>
                  <TableCell align='center'>{item.quantity}</TableCell>
                  <TableCell align='center'>{item.totalPrice.centAmount / 100}$</TableCell>
                </TableRow>
              ))}
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
      ) : (
        <Typography variant='h5' component='h5'>
          No products! <Link to={RouteLinks.Catalog}>To catalog...</Link>
        </Typography>
      )}
    </>
  );
};
