import React, { FC } from 'react';

import { TableRow, TableCell } from '@mui/material';
import { LineItem } from '@commercetools/platform-sdk';

import fallbackImage from '../../assets/images/not-found.jpg';

import styles from './CartTableItem.module.css';

interface CartTableItemProps {
  item: LineItem;
}

export const CartTableItem: FC<CartTableItemProps> = ({ item }) => {
  const { productKey, variant, name, quantity, totalPrice } = item;
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

  return (
    <TableRow className={styles.item} key={productKey}>
      <TableCell align='center' className={styles.imageWrapper}>
        <img className={styles.image} src={variant.images ? variant.images[0].url : fallbackImage} />
      </TableCell>
      <TableCell align='center'>{normalizeName(name['en-US'])}</TableCell>
      <TableCell align='center'>{quantity}</TableCell>
      <TableCell align='center'>{totalPrice.centAmount / 100}$</TableCell>
    </TableRow>
  );
};
