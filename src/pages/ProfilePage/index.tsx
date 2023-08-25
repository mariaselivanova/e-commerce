import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { DataGrid } from '@mui/x-data-grid';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, SchemaType } from './validationSchema';

import { getMe } from '../../sdk/requests';

import styles from './ProfilePage.module.css';
import { ChangePasswordModal } from '../../components/ChangePasswordModal';

interface IUserState {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string;
}

export const ProfilePage: FC = () => {
  const [user, setUser] = useState<IUserState>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  });
  const [isInfoEditMode, setIsInfoEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(schema), mode: 'onSubmit' });

  const onSubmitHandler = (data: SchemaType): void => {
    setIsInfoEditMode(false);
    console.log(data);
  };

  useEffect(() => {
    getMe().then(({ body: { firstName, lastName, dateOfBirth, email } }: ClientResponse<Customer>) => {
      setUser({ firstName, lastName, dateOfBirth, email });
    });
  }, []);

  console.log(isInfoEditMode);

  return (
    <>
      <ChangePasswordModal open={open} handleClose={handleClose} />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid className={styles.grid} container rowGap={2} columns={3}>
          <Grid item xs={1}>
            <TextField
              className={styles.textfield}
              disabled={!isInfoEditMode}
              error={!!errors.firstname}
              value={user.firstName}
              helperText={errors.firstname?.message}
              {...register('firstname')}
              type={'text'}
              id='input-firstname'
              label='First Name'
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              disabled={!isInfoEditMode}
              error={!!errors.lastname}
              value={user.lastName}
              helperText={errors.lastname?.message}
              {...register('lastname')}
              type={'text'}
              id='input-lastname'
              label='Last Name'
            />
          </Grid>
          <Grid className={styles.editButtonContainer} item xs={1}>
            {!isInfoEditMode ? (
              <Button
                variant='contained'
                className={styles.button}
                onClick={(): void => {
                  setIsInfoEditMode(true);
                }}
              >
                Edit profile Information
              </Button>
            ) : (
              <Button variant='contained' className={styles.button} type='submit'>
                Save
              </Button>
            )}
          </Grid>
          <Grid item xs={1}>
            <Controller
              control={control}
              name='date'
              render={({ field: { onChange, value = '' } }): ReactElement => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={!isInfoEditMode}
                    label='Birthday'
                    disableFuture
                    value={value}
                    onChange={onChange}
                    format={'DD-MM-YYYY'}
                    slotProps={{
                      textField: {
                        helperText: errors.date?.message,
                        error: !!errors.date,
                      },
                    }}
                    minDate={dayjs().subtract(130, 'year') as unknown as Date}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField disabled={true} value={user.email} type={'text'} id='input-email' label='E-mail' />
          </Grid>
          <Grid className={styles.passwordButtonContainer} item xs={1}>
            <Button className={styles.button} variant='contained' onClick={handleOpen}>
              Set new password
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant='h5' component='h5'>
        Addresses
      </Typography>
      <DataGrid rows={5} columns={1} />
    </>
  );
};
