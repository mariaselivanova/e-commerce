import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import styles from './AddressDataGrid.module.css';

interface IUserState {
  processedAddresses: Address[];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const AddressDataGrid = () => {
  const { closeError, handleError } = useErrorHandling();

  const [user, setUser] = useState<IUserState>({
    processedAddresses: [],
  });

  const defineType = (
    id: string | undefined,
    defaultBillingAddressId: string | undefined,
    defaultShippingAddressId: string | undefined,
    billingAddressIds: string,
    shippingAddressIds: string,
  ): string | undefined => {
    let typeString = '';
    if (defaultBillingAddressId === id) {
      typeString += '[Default Billing] ';
    }
    if (defaultShippingAddressId === id) {
      typeString += '[Default Shipping] ';
    }
    if (billingAddressIds === id) {
      typeString += '(Billing) ';
    }
    if (shippingAddressIds === id) {
      typeString += '(Shipping) ';
    }
    return typeString;
  };

  useEffect(() => {
    closeError();
    getMe()
      .then(
        ({
          body: { addresses, defaultBillingAddressId, defaultShippingAddressId, shippingAddressIds, billingAddressIds },
        }: ClientResponse<Customer>) => {
          const testAddresses = addresses.map((address) => {
            const shipping = shippingAddressIds as string[];
            const shippingId = shipping[0];
            const billing = billingAddressIds as string[];
            const billingId = billing[0];
            const processedAddress = {
              city: address.city,
              country: address.country,
              id: address.id,
              postalCode: address.postalCode,
              streetName: address.streetName,
              type: defineType(address.id, defaultBillingAddressId, defaultShippingAddressId, billingId, shippingId),
            };
            return processedAddress;
          });
          console.log(testAddresses);
          const processedAddresses = testAddresses;
          setUser({ processedAddresses });
        },
      )
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'streetName',
      headerName: 'Street name',
      width: 200,
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
      width: 100,
    },
    {
      field: 'type',
      headerName: 'Address type',
      sortable: false,
      width: 220,
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
