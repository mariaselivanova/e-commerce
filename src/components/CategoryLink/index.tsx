import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { IProductSubcategory, RouteLinks } from '../../utils/types';

import styles from './CategoryLink.module.css';

interface ICategoryLinkProps {
  id: string;
  categoryName: string;
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

  const openCategory = (categoryId: string): void => {
    navigate(`${RouteLinks.Catalog}?category=${categoryId}`);
    handleClose();
  };

  return (
    <>
      {subcategories.length ? (
        <>
          <Button className={styles.link} size='large' endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
            {categoryName}
          </Button>
          <Menu anchorEl={anchor} open={open} onClose={handleClose}>
            {subcategories.map((sub) => (
              <MenuItem key={sub.key} onClick={(): void => openCategory(sub.id)}>
                {sub.categoryName}
              </MenuItem>
            ))}
            <MenuItem onClick={(): void => openCategory(id)}>All {categoryName}</MenuItem>
          </Menu>
        </>
      ) : (
        <Button className={styles.link} size='large' onClick={(): void => navigate(`${RouteLinks.Catalog}?category=${id}`)}>
          {categoryName}
        </Button>
      )}
    </>
  );
};
