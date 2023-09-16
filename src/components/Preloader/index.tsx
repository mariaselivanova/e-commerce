import React, { FC } from 'react';
import { Box } from '@mui/material';

import styles from './Preloader.module.css';

export const Preloader: FC = () => <Box className={styles.loadingIndicator} />;
