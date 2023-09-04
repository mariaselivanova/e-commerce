import React, { FC } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from '@mui/x-data-grid';
import { createAddress, getMe } from '../../sdk/requests';
import { RowData } from '../EditAddressDataGrid/types';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

export const EditToolbar: FC<EditToolbarProps> = ({ setRows, setRowModesModel }: EditToolbarProps) => {
  const handleClick = (): void => {
    let newRowId = '';
    const newRow = {
      streetName: 'Your Street',
      city: 'City',
      postalCode: '00000',
      country: 'US',
      defaultBilling: false,
      defaultShipping: false,
      isNew: true,
    };
    getMe().then((data) => {
      const { id, version } = data.body;
      createAddress(id, version, newRow as RowData)
        .then((response) => {
          const { addresses } = response.body;
          newRowId = addresses[addresses.length - 1].id as string;
        })
        .then(() => {
          console.log(newRowId);

          if (newRowId) {
            setRows((oldRows) => [...oldRows, { ...newRow, id: newRowId }]);
            setRowModesModel((oldModel) => ({
              ...oldModel,
              [newRowId]: { mode: GridRowModes.Edit, fieldToFocus: 'streetName' },
            }));
          } else {
            console.error('No id aquired!');
          }
        });
    });
  };
  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Add address
      </Button>
    </GridToolbarContainer>
  );
};
