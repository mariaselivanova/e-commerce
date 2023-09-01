import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { /* MenuItem, Select, TextField, */ Typography } from '@mui/material';
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
  // GridFilterItem,
  // useGridApiContext,
  // GridCellParams,
  // GridRowModel,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import { Address, ClientResponse, Customer } from '@commercetools/platform-sdk';
import Alert, { AlertProps } from '@mui/material/Alert';
import { COUNTRIES } from '../../utils/countries';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { changeAddress, createAddress, getMe, removeAddress } from '../../sdk/requests';

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

// const typeOptions = ['Default billing', 'Default shipping', 'Billing', 'Shipping'];

// function CustomFilterInputSingleSelect(props) {
//   const { item, applyValue, type, apiRef, focusElementRef, ...others } = props;

//   return (
//     <TextField
//       id={`contains-input-${item.id}`}
//       value={item.value}
//       onChange={(event) => applyValue({ ...item, value: event.target.value })}
//       type={type || 'text'}
//       variant='standard'
//       InputLabelProps={{
//         shrink: true,
//       }}
//       inputRef={focusElementRef}
//       select
//       SelectProps={{
//         native: true,
//       }}
//     >
//       {['', ...typeOptions].map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </TextField>
//   );
// }

// const  CustomEditComponent = (props: { id: GridRowId; value: string; field: string; }) => {
//   const { id, value, field } = props;
//   const apiRef = useGridApiContext();

//   const handleChange = (event: Event): void => {
//     const eventTarget = event.target as HTMLInputElement;
//     const eventValue = eventTarget?.value;
//     console.log({ eventValue });
//     const newValue =
//       typeof eventValue === "string" ? value.split(",") : eventValue;
//     apiRef.current.setEditCellValue({
//       id,
//       field,
//       value: newValue.filter((x: string) => x !== "")
//     });
//   };
//   return (
//     <Select
//       labelId="demo-multiple-name-label"
//       id="demo-multiple-name"
//       multiple
//       value={value}
//       onChange={handleChange}
//       sx={{ width: "100%" }}
//     >
//       {discountOptions.map((option) => (
//         <MenuItem key={option} value={option}>
//           {option}
//         </MenuItem>
//       ))}
//     </Select>
//   );
// }
// const CustomDiscountEditCell = (params) => <CustomEditComponent {...params} />;

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

  const [streetErrorMessages, setStreetErrorMessages] = useState('');
  const [cityErrorMessages, setCityErrorMessages] = useState('');
  const [postalErrorMessages, setPostalErrorMessages] = useState('');

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

      // const editedRow = rows.find((row) => row.id === id);
      // // if (editedRow && editedRow.isNew) {
      // if (editedRow) {
      //   setRows(rows.filter((row) => row.id !== id));
      // }
    },
    [rowModesModel],
  );

  const processRowUpdate = useCallback((newRow: GridRowModel): GridRowModel => {
    console.log(newRow);
    getMe()
      .then((data) => {
        const isAddressExists = data.body.addresses.find((e) => newRow.id === e.id);
        if (!isAddressExists) {
          createAddress(data.body.id, data.body.version, newRow as RowData).then(() => {
            setSnackbar({ children: 'New address successfully created!', severity: 'success' });
          });
          return;
        }
        changeAddress(data.body.id, data.body.version, newRow.id as string, newRow as RowData).then(() => {
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

  // const handleInvalidCells = (params: GridCellParams): string => {
  //   console.log(params);
  //   if (!params.hasFocus) {
  //     return '';
  //   }
  //   return streetErrorMessages ? '' : 'invalid';
  // };

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
        field: 'type',
        headerName: 'Address type',
        sortable: false,
        width: 400,
        // valueFormatter: ({ value }) => (value ? value.join('/') : ''),
        // renderEditCell: CustomDiscountEditCell,
        // filterOperators: [
        //   {
        //     value: 'contains',
        //     getApplyFilterFn: (filterItem): unknown => {
        //       if (filterItem.value == null || filterItem.value === '') {
        //         return null;
        //       }
        //       return ({ value }) => value.some((cellValue) => cellValue === filterItem.value);
        //     },
        //     InputComponent: CustomFilterInputSingleSelect,
        //   },
        // ],
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
