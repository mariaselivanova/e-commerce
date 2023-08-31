import React, { FC } from 'react';
import { IconButton, Stack, Step, StepLabel } from '@mui/material';

import leftArrow from '../../../assets/icons/left-arrow.svg';
import rightArrow from '../../../assets/icons/right-arrow.svg';
import styles from './Thumbnails.module.css';

interface IThumbnail {
  images: string[];
  handleBack: () => void;
  handleNext: () => void;
  handleStep: (arg0: number) => void;
  activeStep: number;
  isModal?: boolean;
}

export const Thumbnails: FC<IThumbnail> = ({ images, handleBack, handleNext, handleStep, activeStep, isModal }) => (
  <Stack direction='row' className={isModal ? styles.thumbnailModal : styles.thumbnail}>
    <IconButton onClick={handleBack} className={styles.iconButton}>
      <img src={leftArrow} alt='Left arrow' className={styles.arrowImg} />
    </IconButton>
    {!isModal &&
      images.map((image, index) => (
        <Step key={image}>
          <StepLabel onClick={(): void => handleStep(index)}>
            <img src={image} className={activeStep === index ? styles.imgActiveDot : styles.imgDot} />
          </StepLabel>
        </Step>
      ))}

    <IconButton onClick={handleNext} className={styles.iconButton}>
      <img src={rightArrow} alt='Right arrow' className={styles.arrowImg} />
    </IconButton>
  </Stack>
);
