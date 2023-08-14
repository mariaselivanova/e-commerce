import React, { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Typography, TextField, Button, IconButton } from '@mui/material';
import { schemaLogin } from './validationSchema';

import styles from './styles.module.css';
import eyeIcon from '../../assets/icons/eye.svg';
import eyeIconClosed from '../../assets/icons/eye-closed.svg';

export const LoginPage: FC = () => {
  type UserSubmitForm = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(schemaLogin), mode: 'onChange' });

  const onSubmitHandler = (data: UserSubmitForm): void => {
    console.log(errors);
    console.log({ data });
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const srcIcon = isPasswordVisible ? eyeIcon : eyeIconClosed;
  const altIcon = isPasswordVisible ? 'Eye' : 'Closed eye';

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Stack className={styles.formContainer}>
        <Typography variant='h4' color={'#41596E'}>
          Log In
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField
            error={!!errors.email}
            className={styles.emailInput}
            helperText={errors.email?.message}
            {...register('email')}
            type={'text'}
            id='input-email'
            label='E-mail'
          />
          <TextField
            className={styles.passwordInput}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'password'}
            id='input-password'
            label='Password'
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  <img className={styles.iconEye} src={srcIcon} alt={altIcon} />
                </IconButton>
              ),
            }}
          />
          <Button variant='contained' size='large' type='submit' className={styles.logInBtn}>
            Log In
          </Button>
        </form>
        <Stack direction='row'>
          <Typography>New Customer?</Typography>
          <Typography href='/register' component='a' className={styles.link}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
