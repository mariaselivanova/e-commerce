import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell, Typography } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';

import { RouteLinks } from '../../utils/types';
import { useWindowWidth } from '../../hooks/useWindowWidth';

import { PriceDisplay } from '../PriceDisplay';
import { AddToCartBtn } from '../AddToCartBtn';
import { RemoveItemsBtn } from '../RemoveItemsBtn';

import fallbackImage from '../../assets/images/not-found.jpg';
import styles from './CartTableItem.module.css';

interface CartTableItemProps {
  item: LineItem;
  setSuccessMessage: (message: string) => void;
  handleError: (error: Error) => void;
}

export const CartTableItem: FC<CartTableItemProps> = ({ item, setSuccessMessage, handleError }) => {
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

  const onProductClick = (): void => {
    navigate(`${RouteLinks.Catalog}/${productKey}`);
  };

  return (
    <>
      <TableRow className={styles.item} key={productKey}>
        <TableCell align='center'>
          <img className={styles.image} src={variant.images ? variant.images[0].url : fallbackImage} onClick={onProductClick} />
          {windowWidth <= 750 && (
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
          <AddToCartBtn productId={productId} quantity={quantity} isInCart={true} setSuccessMessage={setSuccessMessage} handleError={handleError} />
        </TableCell>
        <TableCell align='center' className={styles.itemPrice}>
          <PriceDisplay
            initialPrice={price.value.centAmount}
            size={windowWidth > 1101 ? 'large' : 'small'}
            discountedPrice={price.discounted?.value && price.discounted.value.centAmount}
            directionRow={windowWidth > 1101}
          />
        </TableCell>
        <TableCell align='center'>
          <PriceDisplay
            initialPrice={price.value.centAmount * quantity}
            size={windowWidth > 1101 ? 'large' : 'small'}
            discountedPrice={price.discounted?.value && price.discounted.value.centAmount * quantity}
            directionRow={windowWidth > 1101}
          />
        </TableCell>
        <TableCell>
          <RemoveItemsBtn itemId={item.productId} setSuccessMessage={setSuccessMessage} />
        </TableCell>
      </TableRow>
    </>
  );
};
