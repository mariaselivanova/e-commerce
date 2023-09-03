import React, { useState, ReactElement, FC } from 'react';

import { TextField, IconButton } from '@mui/material';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import eyeIcon from '../../assets/icons/eye.svg';
import eyeIconClosed from '../../assets/icons/eye-closed.svg';

import styles from './CustomPasswordInput.module.css';

enum InputTypes {
  'password',
  'confirmPassword',
  'currentPassword',
  'newPassword',
}

interface CustomPasswordProps {
  error?: FieldError;
  register: UseFormRegisterReturn<keyof typeof InputTypes>;
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
      InputProps={{
        endAdornment: (
          <IconButton className={styles.iconButton} onClick={togglePasswordVisibility}>
            <img className={styles.iconEye} src={srcIcon} alt={altIcon} />
          </IconButton>
        ),
      }}
    />
  );
};
