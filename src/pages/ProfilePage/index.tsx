import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../sdk/requests';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { ChangePasswordModal } from '../../components/ChangePasswordModal';
import { ProfileInfoModal } from '../../components/ProfileInfoModal';
import { ProfileInfoBlock } from '../../components/ProfileInfoBlock';
import { UserMessage } from '../../components/UserMessage';
import { EditAddressDataGrid } from '../../components/EditAddressDataGrid';
import { IUserState } from '../../utils/types';
import { useWindowWidth } from '../../hooks/useWindowWidth';

import styles from './ProfilePage.module.css';

export const ProfilePage: FC = () => {
  const [user, setUser] = useState<IUserState>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  });
  const [openPassModal, setOpenPassModal] = useState(false);
  const handleOpenPassModal = (): void => setOpenPassModal(true);
  const handleClosePassModal = (): void => setOpenPassModal(false);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleOpenInfoModal = (): void => setOpenInfoModal(true);
  const handleCloseInfoModal = (): void => setOpenInfoModal(false);

  const [isProfileEditDisabled, setIsProfileEditDisabled] = useState(true);

  const { errorState, closeError, handleError } = useErrorHandling();

  useEffect(() => {
    closeError();
    getMe()
      .then(({ body: { firstName, lastName, dateOfBirth, email } }: ClientResponse<Customer>) => {
        setUser({ firstName, lastName, dateOfBirth: dayjs(dateOfBirth).format('DD.MM.YYYY'), email });
      })
      .catch(handleError)
      .finally(() => {
        setIsProfileEditDisabled(false);
      });
  }, [closeError, handleError]);

  const windowDimensions = useWindowWidth();

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <ChangePasswordModal user={user} open={openPassModal} handleClose={handleClosePassModal} />
      <ProfileInfoModal user={user} setUser={setUser} open={openInfoModal} handleClose={handleCloseInfoModal} />
      <Stack className={styles.gridContainer}>
        <Grid className={styles.grid} container rowGap={3} columns={windowDimensions.windowWidth < 1000 ? 1 : 2}>
          <ProfileInfoBlock info={user.firstName} label={'First name'} />
          <ProfileInfoBlock info={user.lastName} label={'Last Name'} />
          <ProfileInfoBlock info={user.dateOfBirth?.split('-').reverse().join('.')} label={'Birthday'} />
          <ProfileInfoBlock info={user.email} label={'E-mail'} />
          <Box className={styles.editButtonContainer}>
            <Button disabled={isProfileEditDisabled} variant='contained' className={styles.button} onClick={handleOpenInfoModal}>
              Edit profile Information
            </Button>
          </Box>
          <Box className={styles.passwordButtonContainer}>
            <Button disabled={isProfileEditDisabled} className={styles.button} variant='contained' onClick={handleOpenPassModal}>
              Set new password
            </Button>
          </Box>
        </Grid>
      </Stack>
      <Box className={styles.addresses}>
        <Typography variant='h5' component='h5'>
          Addresses
        </Typography>
        <EditAddressDataGrid />
      </Box>
    </>
  );
};
