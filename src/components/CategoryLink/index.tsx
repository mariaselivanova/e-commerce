/* eslint-disable react/no-array-index-key */
import { Button, Menu, MenuItem } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IProductSubcategory, RouteLinks } from '../../utils/types';

import styles from './CategoryLink.module.css';

interface ICategoryLinkProps {
  categoryName: string;
  id: string;
  subcategories: IProductSubcategory[];
}

export const CategoryLink: FC<ICategoryLinkProps> = ({ id, categoryName, subcategories }) => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchor(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchor(null);
  };

  const handleGetProductsByCategory = (categoryId: string): void => {
    navigate(`${RouteLinks.Catalog}?category=${categoryId}`);
    handleClose();
  };

  return (
    <div>
      {subcategories.length ? (
        <>
          <Button size='large' onClick={handleClick} className={styles.link} endIcon={<KeyboardArrowDownIcon />}>
            {categoryName}
          </Button>
          <Menu anchorEl={anchor} open={open} onClose={handleClose}>
            {subcategories.map((sub) => (
              <MenuItem key={sub.key} onClick={(): void => handleGetProductsByCategory(sub.id)}>
                {sub.categoryName}
              </MenuItem>
            ))}
            <MenuItem onClick={(): void => handleGetProductsByCategory(id)}>All {categoryName}</MenuItem>
          </Menu>
        </>
      ) : (
        <Button size='large' className={styles.link} onClick={(): void => handleGetProductsByCategory(id)}>
          {categoryName}
        </Button>
      )}
    </div>
  );
};
