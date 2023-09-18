import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableRow, TableCell, IconButton, Button, Typography } from '@mui/material';
import { Cart, LineItem } from '@commercetools/platform-sdk';

import { RouteLinks } from '../../utils/types';

import { PriceDisplay } from '../PriceDisplay';
import { AddToCartBtn } from '../AddToCartBtn';
import { CartDialog } from '../CartDialog';

import trashBin from '../../assets/icons/trash-bin.svg';
import fallbackImage from '../../assets/images/not-found.jpg';
import styles from './CartTableItem.module.css';

interface CartTableItemProps {
  item: LineItem;
  setSuccessMessage: (message: string) => void;
  handleError: (error: Error) => void;
  myCart: Cart;
}

export const CartTableItem: FC<CartTableItemProps> = ({ item, setSuccessMessage, handleError, myCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
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

  const onProductClick = (): void => {
    navigate(`${RouteLinks.Catalog}/${productKey}`);
  };

  const handleDialogOpen = (): void => {
    setOpen(true);
  };

  return (
    <>
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
          <AddToCartBtn productId={productId} quantity={quantity} isInCart={true} setSuccessMessage={setSuccessMessage} handleError={handleError} />
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
            <IconButton className={styles.trashBinBtn} onClick={handleDialogOpen}>
              <img className={styles.trashBin} src={trashBin} alt='remove product' />
            </IconButton>
          )}
        </TableCell>
        <CartDialog
          setSuccessMessage={setSuccessMessage}
          open={open}
          setOpen={setOpen}
          myCart={myCart}
          handleError={handleError}
          isSingleItem={true}
          setIsLoading={setIsLoading}
          productId={productId}
        />
      </TableRow>
    </>
  );
};
