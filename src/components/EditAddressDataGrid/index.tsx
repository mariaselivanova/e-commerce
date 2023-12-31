import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Checkbox, Chip, Typography } from '@mui/material';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowEditStopReasons,
  GridRowModel,
  GridPreProcessEditCellProps,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { GridRowModesModelProps } from '@mui/x-data-grid/models/api/gridEditingApi';
import {
  getMe,
  changeAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  removeAddress,
  resetDefaultBillingAddress,
  resetDefaultShippingAddress,
} from '../../sdk/requests';

import { RowData, ProcessedAddress, DefaultAddresses, DefaultAddressesProps, GridPreProcessEditCellReturn } from './types';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { COUNTRIES } from '../../utils/countries';
import { getPostalCodeError, VALIDATION_RULES } from '../../utils/validation';
import { EditToolbar } from '../EditAddressDataGridToolbar';
import styles from './EditAddressDataGrid.module.css';

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

  const handleCloseSnackbar = (): void => setSnackbar(null);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      const e = event;
      e.defaultMuiPrevented = true;
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
      const currentRow = rows.find((e) => e.id === id);
      if ((currentRow?.city && !currentRow.country && currentRow.postalCode && currentRow.streetName) || currentRow?.isNew) {
        getMe()
          .then((data) => {
            removeAddress(data.body.id, data.body.version, id as string)
              .then(() => {
                setRows(rows.filter((row) => row.id !== id));
                setSnackbar({ children: 'Address successfully removed', severity: 'success' });
              })
              .then(() => {
                setStreetErrorMessages('');
                setCityErrorMessages('');
                setPostalErrorMessages('');
              })
              .catch(() => {
                setSnackbar({ children: 'An error occured! Try again.', severity: 'error' });
              });
          })
          .catch(() => {
            setSnackbar({ children: 'An error occured! Try again.', severity: 'error' });
          });
        return;
      }
      setStreetErrorMessages('');
      setCityErrorMessages('');
      setPostalErrorMessages('');
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    },
    [rowModesModel, rows],
  );

  const processRowUpdate = useCallback((newRow: GridRowModel): GridRowModel => {
    try {
      const { defaultBilling, defaultShipping } = newRow;
      const rowId = newRow.id;
      getMe().then((data) => {
        const { addresses, id, version } = data.body;
        const isAddressExists = addresses.find((e) => newRow.id === e.id);
        if (!isAddressExists) {
          return;
        }
        changeAddress(id, version, newRow.id as string, newRow as RowData)
          .then(async (initialVersion) => {
            const { defaultBillingAddressId, defaultShippingAddressId } = initialVersion.body;
            let billingVersion = initialVersion.body.version;

            if (defaultBilling) {
              const response = await setDefaultBillingAddress(id, billingVersion, rowId);
              billingVersion = response.body.version;
            } else if (defaultBillingAddressId === newRow.id) {
              const response = await resetDefaultBillingAddress(id, billingVersion);
              billingVersion = response.body.version;
            }

            if (defaultShipping) {
              await setDefaultShippingAddress(id, billingVersion, rowId);
            } else if (defaultShippingAddressId === newRow.id) {
              await resetDefaultShippingAddress(id, billingVersion);
            }
          })
          .then(() => {
            setSnackbar({ children: 'Success!', severity: 'success' });
          });
      });
    } catch {
      setSnackbar({ children: 'An error occured! Try again.', severity: 'error' });
    }
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
  }, [closeError, handleError, getDefaultAddresses, processRowUpdate]);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'streetName',
        headerName: 'Street name',
        width: 150,
        editable: true,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps): GridPreProcessEditCellReturn => {
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
        width: 100,
        editable: true,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps): GridPreProcessEditCellReturn => {
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
        preProcessEditCellProps: (params: GridPreProcessEditCellProps): GridPreProcessEditCellReturn => {
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
        width: 130,
        renderCell: (params: GridRenderCellParams): React.ReactElement | string => {
          const { id, value } = params;
          const currentRow = rowModesModel[id] as GridRowModesModelProps | undefined;
          const isInEditMode = currentRow?.mode === GridRowModes.Edit;

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
        width: 130,
        renderCell: (params: GridRenderCellParams): React.ReactElement | string => {
          const { id, value } = params;
          const currentRow = rowModesModel[id] as GridRowModesModelProps | undefined;
          const isInEditMode = currentRow?.mode === GridRowModes.Edit;

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
          const currentRow = rowModesModel[id] as GridRowModesModelProps | undefined;
          const isInEditMode = currentRow?.mode === GridRowModes.Edit;

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

  return (
    <>
      <Box
        sx={{
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
          errorColorGrid: {},
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
          hideFooter
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
