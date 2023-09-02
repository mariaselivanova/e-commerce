import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Checkbox, Chip, Typography } from '@mui/material';
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
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import Alert, { AlertProps } from '@mui/material/Alert';
import { COUNTRIES } from '../../utils/countries';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { changeAddress, createAddress, getMe, removeAddress, setDefaultBillingAddress, setDefaultShippingAddress } from '../../sdk/requests';

import styles from './EditAddressDataGrid.module.css';
import { getPostalCodeError, VALIDATION_RULES } from '../../utils/validation';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

interface RowData {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  streetName: string;
  type: string;
}

const randomId = (): string => (Math.random() + 1).toString(36).substring(4);

const EditToolbar: FC<EditToolbarProps> = ({ setRows, setRowModesModel }: EditToolbarProps) => {
  const handleClick = (): void => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, streetName: '', city: '', postalCode: '', country: 'US', type: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'streetName' },
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
  defaultBilling?: boolean;
  defaultShipping?: boolean;
}

interface DefaultAddresses {
  billing: boolean;
  shipping: boolean;
}

interface DefaultAddressesProps {
  id?: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
}

export const EditAddressDataGrid: FC = () => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [streetErrorMessages, setStreetErrorMessages] = useState('');
  const [cityErrorMessages, setCityErrorMessages] = useState('');
  const [postalErrorMessages, setPostalErrorMessages] = useState('');

  const { closeError, handleError } = useErrorHandling();

  const [rows, setRows] = useState<ProcessedAddress[]>([]);

  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const getDefaultAddresses = useCallback(({ defaultBillingAddressId, defaultShippingAddressId, id }: DefaultAddressesProps): DefaultAddresses => {
    const defaultAddresses: DefaultAddresses = {
      billing: false,
      shipping: false,
    };

    // guess we should check id for undefined
    if (!id) {
      defaultAddresses.billing = false;
      defaultAddresses.shipping = false;
    }

    if (defaultBillingAddressId === id) {
      defaultAddresses.billing = true;
    }

    if (defaultShippingAddressId === id) {
      defaultAddresses.shipping = true;
    }

    return defaultAddresses;
  }, []);

  useEffect(() => {
    closeError();
    getMe()
      .then(({ body: { addresses, defaultBillingAddressId, defaultShippingAddressId } }: ClientResponse<Customer>) => {
        const testAddresses = addresses.map(({ city, country, id, postalCode, streetName }): ProcessedAddress => {
          const defaultAddresses = getDefaultAddresses({ defaultBillingAddressId, defaultShippingAddressId, id });

          const processedAddress = {
            city,
            country,
            id,
            postalCode,
            streetName,
            defaultBilling: defaultAddresses.billing,
            defaultShipping: defaultAddresses.shipping,
          };

          return processedAddress;
        });

        setRows(testAddresses);
      })
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseSnackbar = (): void => setSnackbar(null);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // eslint-disable-next-line no-param-reassign
      event.defaultMuiPrevented = true;
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
      getMe()
        .then((data) => {
          removeAddress(data.body.id, data.body.version, id as string).then(() => {
            setRows(rows.filter((row) => row.id !== id));
            setSnackbar({ children: 'Address successfully removed', severity: 'success' });
          });
        })
        .catch(() => {
          setSnackbar({ children: 'An error occured! Try again.', severity: 'error' });
        });
    },
    [rows],
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
      setStreetErrorMessages('');
      setCityErrorMessages('');
      setPostalErrorMessages('');
    },
    [rowModesModel],
  );

  const processRowUpdate = useCallback((newRow: GridRowModel): GridRowModel => {
    const { defaultBilling, defaultShipping } = newRow;
    const rowId = newRow.id;
    console.log(rowId);
    getMe()
      .then((data) => {
        const { addresses, id, version } = data.body;
        const isAddressExists = addresses.find((e) => newRow.id === e.id);
        if (!isAddressExists) {
          if (defaultBilling) {
            setDefaultBillingAddress(id, version, rowId);
          }
          if (defaultShipping) {
            setDefaultShippingAddress(id, version, rowId);
          }
          createAddress(id, version, newRow as RowData).then(() => {
            setSnackbar({ children: 'New address successfully created!', severity: 'success' });
          });
          return;
        }
        if (defaultBilling) {
          setDefaultBillingAddress(id, version, rowId);
        }
        if (defaultShipping) {
          setDefaultShippingAddress(id, version, rowId);
        }
        changeAddress(id, version, newRow.id as string, newRow as RowData).then(() => {
          setSnackbar({ children: 'Address successfully changed!', severity: 'success' });
        });
      })
      .catch(() => {
        setSnackbar({ children: 'An error occured! Try again.', severity: 'error' });
      });
    return newRow;
  }, []);

  const handleRowModesModelChange = useCallback((newRowModesModel: GridRowModesModel): void => {
    setRowModesModel(newRowModesModel);
  }, []);

  const handleProcessRowUpdateError = (error: Error): void => {
    setSnackbar({ children: error.message, severity: 'error' });
  };

  const handleCheckboxAddresses = (id: string, value: keyof ProcessedAddress): void => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === id) {
          return { ...row, [value]: !row[value] };
        }
        return row;
      }),
    );
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
          const rule = !VALIDATION_RULES.streetRules.test(value);
          const min = !value?.length;

          const error = rule || min;

          if (error) {
            setStreetErrorMessages('Street name can only contain latin characters and must be at least 1 character long!');
          } else {
            setStreetErrorMessages('');
          }
          return { ...params.props, error };
        },
      },
      {
        field: 'city',
        headerName: 'City',
        width: 150,
        editable: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        preProcessEditCellProps: (params: GridPreProcessEditCellProps): any => {
          const { value } = params.props;
          const rule = !VALIDATION_RULES.nameRules.test(value);
          const min = !value?.length;

          const error = rule || min;

          if (error) {
            setCityErrorMessages('City name can only contain latin characters and must be at least 1 character long!');
          } else {
            setCityErrorMessages('');
          }
          return { ...params.props, error };
        },
      },
      {
        field: 'postalCode',
        headerName: 'Postal code',
        width: 110,
        editable: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        preProcessEditCellProps: (params: GridPreProcessEditCellProps): any => {
          const { value } = params.props;
          const { otherFieldsProps } = params;
          const countryCode = otherFieldsProps?.country.value;

          const { hasError, errorMessage } = getPostalCodeError({ postalCode: value, countryCode });

          if (hasError) {
            setPostalErrorMessages(errorMessage);
          } else {
            setPostalErrorMessages('');
          }
          return { ...params.props, error: hasError };
        },
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
        field: 'defaultBilling',
        headerName: 'Default billing',
        align: 'center',
        sortable: false,
        width: 100,
        // вынести renderCell в один компонент
        renderCell: (params: GridRenderCellParams): React.ReactElement | string => {
          const { value } = params;
          const { id } = params;
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          const isOneDefaultBillingTrue = rows.some((obj) => obj.defaultBilling === true) && !value;

          if (isInEditMode) {
            return (
              <Checkbox
                disabled={isOneDefaultBillingTrue}
                checked={value}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(): void => handleCheckboxAddresses(id as string, 'defaultBilling')}
              />
            );
          }

          return value ? <Chip color='primary' label='DB' /> : '—';
        },
      },
      {
        field: 'defaultShipping',
        headerName: 'Default shipping',
        align: 'center',
        sortable: false,
        width: 100,
        renderCell: (params: GridRenderCellParams): React.ReactElement | string => {
          const { value } = params;
          const { id } = params;
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          const isOneDefaultShippingTrue = rows.some((obj) => obj.defaultShipping === true) && !value;

          if (isInEditMode) {
            return (
              <Checkbox
                disabled={isOneDefaultShippingTrue}
                checked={value}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(): void => handleCheckboxAddresses(id as string, 'defaultShipping')}
              />
            );
          }

          return value ? <Chip color='primary' label='DS' /> : '—';
        },
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
    [handleCancelClick, handleDeleteClick, handleEditClick, handleSaveClick, rowModesModel, rows],
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
          '& .invalid': {
            backgroundColor: '#ff6464',
            color: '#1a3e72',
          },
        }}
      >
        <Typography className={styles.errors}>{streetErrorMessages}</Typography>
        <Typography className={styles.errors}>{cityErrorMessages}</Typography>
        <Typography className={styles.errors}>{postalErrorMessages}</Typography>
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
          autoHeight
          // getCellClassName={handleInvalidCells}
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
        <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleCloseSnackbar} autoHideDuration={3000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};
