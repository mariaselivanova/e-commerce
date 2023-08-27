import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import styles from './AddressDataGrid.module.css';

interface IUserState {
  processedAddresses: Address[];
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  shippingAddressIds?: string[] | undefined;
  billingAddressIds: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const AddressDataGrid = () => {
  const { closeError, handleError } = useErrorHandling();

  const [user, setUser] = useState<IUserState>({
    processedAddresses: [],
    defaultBillingAddressId: '',
    defaultShippingAddressId: '',
    shippingAddressIds: [],
    billingAddressIds: [],
  });

  useEffect(() => {
    closeError();
    getMe()
      .then(
        ({
          body: { addresses, defaultBillingAddressId, defaultShippingAddressId, shippingAddressIds, billingAddressIds },
        }: ClientResponse<Customer>) => {
          // const testAddresses = addresses.map((address, index) => {
          //   const addressTypeString = ``;
          //   address.type = addressTypeString;
          //   return processedAddress;
          // });
          // console.log(testAddresses);
          const processedAddresses = addresses;
          setUser({ processedAddresses, defaultBillingAddressId, defaultShippingAddressId, billingAddressIds, shippingAddressIds });
        },
      )
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'streetName',
      headerName: 'Street name',
      width: 150,
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
      editable: true,
    },
    {
      field: 'postalCode',
      headerName: 'Postal code',
      width: 110,
      editable: true,
    },
    {
      field: 'country',
      headerName: 'Country',
      sortable: false,
      width: 160,
    },
    {
      field: 'Type',
      headerName: 'Address type',
      sortable: false,
      width: 160,
    },
  ];

  const rows = user.processedAddresses.map((address) => address);

  return (
    <Box className={styles.grid}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
