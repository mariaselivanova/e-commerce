import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TableRow, TableCell, IconButton, Button, Typography } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';

import { PriceDisplay } from '../PriceDisplay';
import { AddToCartBtn } from '../AddToCartBtn';
import { getCartById, removeItemFromCart } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { UserMessage } from '../UserMessage';
import { RouteLinks } from '../../utils/types';
import trashBin from '../../assets/icons/trash-bin.svg';
import fallbackImage from '../../assets/images/not-found.jpg';
import styles from './CartTableItem.module.css';

interface CartTableItemProps {
  item: LineItem;
}

export const CartTableItem: FC<CartTableItemProps> = ({ item }) => {
  const { errorState, closeError, handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const { productKey, variant, name, quantity, price, productId } = item;
  const normalizeName = (productName: string): string => {
    if (!productName) {
      return 'N/A';
    }

    return productName
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const removeProductAll = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setIsLoading(true);
    setTimeout(() => {
      getCartById(user.cart)
        .then(({ body: { id, version, lineItems } }) => {
          const currentProduct = lineItems.find((lineItem) => lineItem.productId === productId);

          if (currentProduct) {
            removeItemFromCart(id, version, currentProduct.id, quantity);
          }
        })
        .catch(handleError)
        .finally(() => setIsLoading(false));
    }, 300);
  };

  const onProductClick = (): void => {
    navigate(`${RouteLinks.Catalog}/${productKey}`);
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <TableRow className={styles.item} key={productKey}>
        <TableCell align='center'>
          <img className={styles.image} src={variant.images ? variant.images[0].url : fallbackImage} onClick={onProductClick} />
        </TableCell>
        <TableCell align='center'>
          <Typography className={styles.itemTitle} onClick={onProductClick}>
            {normalizeName(name['en-US'])}
          </Typography>
        </TableCell>
        <TableCell align='center'>
          <AddToCartBtn productId={productId} quantity={quantity} isInCart={true} />
        </TableCell>
        <TableCell align='center'>
          <PriceDisplay
            initialPrice={price.value.centAmount * quantity}
            size='large'
            discountedPrice={price.discounted?.value && price.discounted.value.centAmount * quantity}
          />
        </TableCell>
        <TableCell>
          {isLoading ? (
            <Button disabled={true} className={styles.loadingIndicator} />
          ) : (
            <IconButton className={styles.trashBinBtn} onClick={removeProductAll}>
              <img className={styles.trashBin} src={trashBin} alt='remove product' />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
