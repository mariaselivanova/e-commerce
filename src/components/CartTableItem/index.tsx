import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell, IconButton, Button, Typography } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';

import { getCartById, removeItemFromCart } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { RouteLinks } from '../../utils/types';

import { PriceDisplay } from '../PriceDisplay';
import { AddToCartBtn } from '../AddToCartBtn';
import { UserMessage } from '../UserMessage';

import trashBin from '../../assets/icons/trash-bin.svg';
import fallbackImage from '../../assets/images/not-found.jpg';
import styles from './CartTableItem.module.css';
import { useWindowWidth } from '../../hooks/useWindowWidth';

interface CartTableItemProps {
  item: LineItem;
}

export const CartTableItem: FC<CartTableItemProps> = ({ item }) => {
  const { errorState, closeError, handleError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { windowWidth } = useWindowWidth();

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

  const removeAllProducts = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
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
      }
    } catch (error) {
      handleError(error as Error);
    } finally {
      setIsLoading(false);
    }
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
          {windowWidth <= 460 && (
            <Typography className={styles.itemTitle} onClick={onProductClick}>
              {normalizeName(name['en-US'])}
            </Typography>
          )}
        </TableCell>
        <TableCell align='center' className={styles.nameColumn}>
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
            size={windowWidth > 800 ? 'large' : 'small'}
            discountedPrice={price.discounted?.value && price.discounted.value.centAmount * quantity}
            directionRow={windowWidth > 1000}
          />
        </TableCell>
        <TableCell>
          {isLoading ? (
            <Button disabled={true} className={styles.loadingIndicator} />
          ) : (
            <IconButton className={styles.trashBinBtn} onClick={removeAllProducts}>
              <img className={styles.trashBin} src={trashBin} alt='remove product' />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
