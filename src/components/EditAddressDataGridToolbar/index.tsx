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
    let newRowId: string;
    const newRow = { country: 'US' };
    getMe().then((data) => {
      const { id, version } = data.body;
      createAddress(id, version, newRow as RowData)
        .then((response) => {
          const { addresses } = response.body;
          newRowId = addresses[addresses.length - 1].id as string;
        })
        .then(() => {
          console.log(newRowId);

          setRows((oldRows) => [...oldRows, { id: newRowId, streetName: '', city: '', postalCode: '', country: 'US', type: '', isNew: true }]);
          setRowModesModel((oldModel) => ({
            ...oldModel,
            [newRowId]: { mode: GridRowModes.Edit, fieldToFocus: 'streetName' },
          }));
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
