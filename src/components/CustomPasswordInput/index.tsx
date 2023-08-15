import React, { useState, ReactElement, FC } from 'react';

import { TextField, IconButton } from '@mui/material';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import eyeIcon from '../../assets/icons/eye.svg';
import eyeIconClosed from '../../assets/icons/eye-closed.svg';

import styles from './styles.module.css';

interface CustomPasswordProps {
  error: FieldError | undefined;
  register: UseFormRegisterReturn<'password' | 'confirmPassword'>;
  label: string;
}

export const CustomPasswordInput: FC<CustomPasswordProps> = ({ error, register, label }): ReactElement => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const srcIcon = isPasswordVisible ? eyeIcon : eyeIconClosed;
  const altIcon = isPasswordVisible ? 'Eye' : 'Closed eye';

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      className={styles.passwordInput}
      error={!!error}
      helperText={error?.message}
      {...register}
      type={isPasswordVisible ? 'text' : 'password'}
      label={label}
      autoComplete='new-password'
      InputProps={{
        endAdornment: (
          <IconButton onClick={togglePasswordVisibility}>
            <img className={styles.iconEye} src={srcIcon} alt={altIcon} />
          </IconButton>
        ),
      }}
    />
  );
};
