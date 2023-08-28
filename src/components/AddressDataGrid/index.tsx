import React, { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { getMe } from '../../sdk/requests';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import styles from './AddressDataGrid.module.css';

interface AddressState {
  processedAddresses: Address[];
}

export const AddressDataGrid: FC = () => {
  const { closeError, handleError } = useErrorHandling();

  const [address, setaddress] = useState<AddressState>({
    processedAddresses: [],
  });

  interface ProcessedAddress {
    city?: string;
    country: string;
    id?: string;
    postalCode?: string;
    streetName?: string;
    type: string;
  }

  const defineType = (
    billingAddressIds?: string[],
    shippingAddressIds?: string[],
    id?: string,
    defaultBillingAddressId?: string,
    defaultShippingAddressId?: string,
  ): string => {
    let typeString = '';
    if (!id) {
      return 'Unknown address!';
    }
    if (defaultBillingAddressId === id) {
      typeString += '[Default Billing] ';
    }
    if (defaultShippingAddressId === id) {
      typeString += '[Default Shipping] ';
    }
    if (billingAddressIds?.includes(id)) {
      typeString += '(Billing) ';
    }
    if (shippingAddressIds?.includes(id)) {
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
          const testAddresses = addresses.map(({ city, country, id, postalCode, streetName }): ProcessedAddress => {
            const processedAddress = {
              city,
              country,
              id,
              postalCode,
              streetName,
              type: defineType(billingAddressIds, shippingAddressIds, id, defaultBillingAddressId, defaultShippingAddressId),
            };
            return processedAddress;
          });
          const processedAddresses = testAddresses;
          setaddress({ processedAddresses });
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

  const rows = address.processedAddresses.map((element) => element);

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
        localeText={{ noRowsLabel: 'Loading addresses...' }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
