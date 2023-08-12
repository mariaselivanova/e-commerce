import React, { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Typography, TextField, Button } from '@mui/material';

import styles from './styles.module.css';

// import { login} from '../../sdk/requests';

// useEffect(() => {
//   login({ email: 'test15@mail.com', password: 'password' });
// }, []);

export const LoginPage: FC = () => {
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailRules = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  type UserSubmitForm = {
    email: string;
    password: string;
  };

  const schema = yup.object().shape({
    email: yup.string().required('Required field!').matches(emailRules, { message: 'Please type an email of correct type!' }),
    password: yup
      .string()
      .required('Required field!')
      .matches(passwordRules, { message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase and 1 number!' }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: UserSubmitForm) => {
    console.log(errors);
    console.log({ data });
  };

  return (
    <>
      <Stack className={styles.formContainer} gap={'2em'}>
        <Typography variant='h4' color={'#41596E'}>
          Log In
        </Typography>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <TextField error={!!errors.email} helperText={errors.email?.message} {...register('email')} type={'text'} id='input-email' label='E-mail' />
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            type={'password'}
            id='input-password'
            label='Password'
          />
          <Button variant='contained' size='large' type='submit' className={styles.logInBtn}>
            Log In
          </Button>
        </form>
        <Stack spacing={1} direction='row'>
          <Typography fontSize={'18px'}>New Customer?</Typography>
          <Typography href='/register' component='a' fontSize={'18px'} color={'#0B8BD5'} className={styles.link}>
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
