import React, { FC } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './OptionsDisplay.module.css';

interface IOptionsDisplayProps {
  option: string | null;
  param: string;
}

export const OptionsDisplay: FC<IOptionsDisplayProps> = ({ option, param }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  const closeOptions = (): void => {
    searchParams.delete(param);
    navigate({ search: searchParams.toString() });
  };

  if (!option) {
    return null;
  }

  return (
    <Stack direction='row' alignItems='center'>
      <Typography className={styles.text}>{option}</Typography>
      <IconButton onClick={closeOptions}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </Stack>
  );
};
