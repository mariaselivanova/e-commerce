import React, { FC, useState } from 'react';
import { Typography, Button, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import styles from './AddToCartBtn.module.css';

export const AddToCartBtn: FC = () => {
  const [amount, setAmount] = useState(0);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAmount(1);
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAmount((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setAmount((prev) => prev - 1);
  };

  return (
    <>
      {amount < 1 ? (
        <Button className={styles.addBtn} onClick={handleAddToCart}>
          Add to cart
        </Button>
      ) : (
        <Stack direction='row' className={styles.amount}>
          <IconButton onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <Typography>{amount}</Typography>
          <IconButton onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Stack>
      )}
    </>
  );
};
