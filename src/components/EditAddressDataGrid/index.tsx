import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridRowModel,
  GridPreProcessEditCellProps,
  // GridRowModel,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import { randomId } from '@mui/x-data-grid-generator';
import Alert, { AlertProps } from '@mui/material/Alert';
import { COUNTRIES } from '../../utils/countries';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { getMe } from '../../sdk/requests';

import styles from './EditAddressDataGrid.module.css';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

const EditToolbar: FC<EditToolbarProps> = ({ setRows, setRowModesModel }: EditToolbarProps) => {
  const handleClick = (): void => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add address
      </Button>
    </GridToolbarContainer>
  );
};

interface ProcessedAddress {
  city?: string;
  country: string;
  id?: string;
  postalCode?: string;
  streetName?: string;
  type: string;
}

export const EditAddressDataGrid: FC = () => {
  // const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { closeError, handleError } = useErrorHandling();

  const [rows, setRows] = useState<Address[]>([]);

  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

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
          setRows(testAddresses);
        },
      )
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseSnackbar = (): void => setSnackbar(null);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
      console.log('Stopped editing');
    }
  };

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel],
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel],
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () => {
      setRows(rows.filter((row) => row.id !== id));
    },
    [rows],
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      const editedRow = rows.find((row) => row.id === id);
      // if (editedRow && editedRow.isNew) {
      if (editedRow) {
        setRows(rows.filter((row) => row.id !== id));
      }
    },
    [rowModesModel, rows],
  );

  const processRowUpdate = useCallback((newRow: GridRowModel): GridRowModel => {
    console.log(newRow);
    setSnackbar({ children: 'Address successfully saved', severity: 'success' });
    throw Error('Validation error!');
    return newRow;
  }, []);

  const handleRowModesModelChange = useCallback((newRowModesModel: GridRowModesModel): void => {
    setRowModesModel(newRowModesModel);
  }, []);

  const handleProcessRowUpdateError = (error: Error): void => {
    console.log(error);
    console.log('hi');
    setSnackbar({ children: error.message, severity: 'error' });
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'streetName',
        headerName: 'Street name',
        width: 200,
        editable: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        preProcessEditCellProps: (params: GridPreProcessEditCellProps): any => {
          const { value } = params.props;
          console.log(params);
          const min = value.length < 3;
          // sym
          // console.log(hasError);
          // if (min && !error) {
          //   setSnackbar({ children: 'min', severity: 'error' });
          // }
          // if (sym && !error) {
          //   setSnackbar({ children: 'sym', severity: 'error' });
          // }
          return { ...params.props, error: min };
        },
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
        editable: true,
        type: 'singleSelect',
        valueOptions: (): string[] => COUNTRIES.map(({ code }) => code),
      },
      {
        field: 'type',
        headerName: 'Address type',
        sortable: false,
        width: 220,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }: { id: GridRowId }): React.ReactElement[] => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                key={id}
                icon={<SaveIcon />}
                label='Save'
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                key={id}
                icon={<CancelIcon />}
                label='Cancel'
                className='textPrimary'
                onClick={handleCancelClick(id)}
                color='inherit'
              />,
            ];
          }

          return [
            <GridActionsCellItem key={id} icon={<EditIcon />} label='Edit' className='textPrimary' onClick={handleEditClick(id)} color='inherit' />,
            <GridActionsCellItem key={id} icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
          ];
        },
      },
    ],
    [handleCancelClick, handleDeleteClick, handleEditClick, handleSaveClick, rowModesModel],
  );

  // const rows = address.processedAddresses.map((element) => element);

  return (
    <>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          className={styles.grid}
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          localeText={{ noRowsLabel: 'No addresses.' }}
        />
      </Box>
      {!!snackbar && (
        <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleCloseSnackbar} autoHideDuration={2000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};
