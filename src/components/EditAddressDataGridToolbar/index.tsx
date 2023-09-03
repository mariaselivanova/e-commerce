import React, { FC } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from '@mui/x-data-grid';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

export const EditToolbar: FC<EditToolbarProps> = ({ setRows, setRowModesModel }: EditToolbarProps) => {
  const randomId = (): string => (Math.random() + 1).toString(36).substring(4);
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
