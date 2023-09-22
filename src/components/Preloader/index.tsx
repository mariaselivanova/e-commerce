import React, { FC } from 'react';
import { Box } from '@mui/material';

import styles from './Preloader.module.css';

interface IPreloaderProps {
  isBig?: boolean;
}

export const Preloader: FC<IPreloaderProps> = ({ isBig = false }) => {
  const preloaderClass = isBig ? `${styles.loadingIndicatorBig} ${styles.loadingIndicator}` : styles.loadingIndicator;

  return <Box className={preloaderClass} />;
};
