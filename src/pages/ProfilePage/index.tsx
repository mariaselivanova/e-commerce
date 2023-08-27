import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, SchemaType } from './validationSchema';

import { getMe } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import styles from './ProfilePage.module.css';
import { ChangePasswordModal } from '../../components/ChangePasswordModal';

interface IUserState {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
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
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const onSubmitHandler = (data: SchemaType): void => {
    setIsInfoEditMode(false);
    console.log(data);
  };

  const { closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    getMe()
      .then(({ body: { firstName, lastName, dateOfBirth, email } }: ClientResponse<Customer>) => {
        setUser({ firstName, lastName, dateOfBirth, email });
      })
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log();

  return (
    <>
      <ChangePasswordModal open={open} handleClose={handleClose} />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid className={styles.grid} container rowGap={3} columns={4}>
          <Grid item xs={1}>
            <TextField
              className={styles.textfield}
              disabled={!isInfoEditMode}
              error={!!errors.firstname}
              value={isInfoEditMode ? null : user.firstName}
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
              defaultValue={user.lastName}
              helperText={errors.lastname?.message}
              {...register('lastname')}
              type={'text'}
              id='input-lastname'
              label='Last Name'
            />
          </Grid>
          <Grid className={styles.editButtonContainer} item xs={1}>
            <Button
              variant='contained'
              className={styles.button}
              onClick={(): void => {
                setIsInfoEditMode(true);
              }}
            >
              Edit profile Information
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant='contained' className={styles.button} type='submit'>
              Save
            </Button>
          </Grid>
          <Grid item xs={1}>
            {isInfoEditMode ? (
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
                      format={'YYYY-MM-DD'}
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
            ) : (
              <TextField disabled defaultValue={user.dateOfBirth} type={'text'} label='Birthday' />
            )}
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
      <Box className={styles.addresses}>
        <Typography variant='h5' component='h5'>
          Addresses
        </Typography>
        <DataGrid columns={[]} rows={[]} />
      </Box>
    </>
  );
};
