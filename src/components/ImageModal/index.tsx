import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

import { ImgSlider } from '../ImgSlider';
import styles from './ImageModal.module.css';

export interface ImageModalProps {
  open: boolean;
  handleClose: () => void;
  images: string[];
  imageStep?: number;
}

export const ImageModal: FC<ImageModalProps> = ({ open, handleClose, images, imageStep }) => (
  <Modal open={open} onClose={handleClose} className={styles.modal}>
    <Box>
      <ImgSlider images={images} isModal={true} imageStep={imageStep} />
    </Box>
  </Modal>
);
