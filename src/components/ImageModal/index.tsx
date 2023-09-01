import React, { FC } from 'react';
import { Modal, Box, IconButton } from '@mui/material';

import { ImgSlider } from '../ImgSlider';
import crossIcon from '../../assets/icons/modal-cross.svg';
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
      <IconButton className={styles.crossIconBtn} onClick={handleClose}>
        <img src={crossIcon} alt='close icon' className={styles.crossIcon} />
      </IconButton>
      <ImgSlider images={images} isModal={true} imageStep={imageStep} />
    </Box>
  </Modal>
);
