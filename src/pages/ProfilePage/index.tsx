import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { ChangePasswordModal } from '../../components/ChangePasswordModal';
import { ProfileInfoModal } from '../../components/ProfileInfoModal';

import styles from './ProfilePage.module.css';
import { AddressDataGrid } from '../../components/AddressDataGrid';
import { ProfileInfoBlock } from '../../components/ProfileInfoBlock';

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
  const [openPassModal, setOpenPassModal] = React.useState(false);
  const handleOpenPassModal = (): void => setOpenPassModal(true);
  const handleClosePassModal = (): void => setOpenPassModal(false);

  const [openInfoModal, setOpenInfoModal] = React.useState(false);
  const handleOpenInfoModal = (): void => setOpenInfoModal(true);
  const handleCloseInfoModal = (): void => setOpenInfoModal(false);

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

  return (
    <>
      <ChangePasswordModal open={openPassModal} handleClose={handleClosePassModal} />
      <ProfileInfoModal open={openInfoModal} handleClose={handleCloseInfoModal} />
      <Grid className={styles.grid} container rowGap={3} columns={3}>
        <ProfileInfoBlock info={user.firstName} label={'First name'} />
        <ProfileInfoBlock info={user.lastName} label={'Last Name'} />
        <Grid className={styles.editButtonContainer} item xs={1}>
          <Button disabled={openInfoModal} variant='contained' className={styles.button} onClick={handleOpenInfoModal}>
            Edit profile Information
          </Button>
        </Grid>
        <ProfileInfoBlock info={user.dateOfBirth} label={'Birthday'} />
        <ProfileInfoBlock info={user.email} label={'E-mail'} />
        <Grid className={styles.passwordButtonContainer} item xs={1}>
          <Button disabled={openPassModal} className={styles.button} variant='contained' onClick={handleOpenPassModal}>
            Set new password
          </Button>
        </Grid>
      </Grid>
      <Box className={styles.addresses}>
        <Typography variant='h5' component='h5'>
          Addresses
        </Typography>
        <AddressDataGrid />
      </Box>
    </>
  );
};
