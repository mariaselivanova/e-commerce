import React, { FC } from 'react';
import { IconButton, Stack, Step, StepLabel } from '@mui/material';
import { Image } from '@commercetools/platform-sdk';

import styles from './Thumbnails.module.css';

interface IThumbnail {
  images: Image[] | undefined;
  onLeftClick: () => void;
  onRightClick: () => void;
  onThumbnailClick: (arg0: number) => void;
  currentStep: number;
}

export const Thumbnails: FC<IThumbnail> = ({
  images: imgs,
  onLeftClick: handleBack,
  onRightClick: handleNext,
  onThumbnailClick: handleStep,
  currentStep: activeStep,
}) => {
  console.log(imgs);
  return (
    <Stack direction={'row'}>
      <IconButton onClick={handleBack}>{'<'}</IconButton>
      {imgs?.map((img, imgID) => (
        <Step key={img.url}>
          <StepLabel onClick={(): void => handleStep(imgID)}>
            <img src={img.url} className={activeStep === imgID ? styles.imgActiveDot : styles.imgDot} />
          </StepLabel>
        </Step>
      ))}

      <IconButton onClick={handleNext}>{'>'}</IconButton>
    </Stack>
  );
};
