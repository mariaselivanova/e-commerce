import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Image } from '@commercetools/platform-sdk';

import { Thumbnails } from './Thumbnails';

export const ImgSlider: FC<{ imgs: Image[] | undefined }> = ({ imgs }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imgs?.length as number;

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 === maxSteps) {
        return 0;
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep - 1 < 0) {
        return maxSteps - 1;
      }
      return prevActiveStep - 1;
    });
  };

  const handleStep = (index: number): void => {
    setActiveStep(index);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      />
      <img src={imgs?.at(activeStep)?.url} />

      <Thumbnails images={imgs} currentStep={activeStep} onLeftClick={handleBack} onRightClick={handleNext} onThumbnailClick={handleStep} />
    </Box>
  );
};
