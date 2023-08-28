/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getCategoryById } from '../../sdk/requests';

export const AppBreadcrumbs: FC = () => {
  const location = useLocation();
  const cameFromCategory = location.state && location.state.fromCategory;
  const [pathnames, setPathnames] = useState<string[]>([]);
  const categoryId = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const newPathnames = location.pathname.split('/').filter((x) => x);

    const fetchData = async (): Promise<void> => {
      if (categoryId) {
        const categoryData = await getCategoryById(categoryId);
        newPathnames.push(categoryData.body.name['en-US']);
      }

      if (cameFromCategory) {
        const fromCategoryData = await getCategoryById(cameFromCategory);
        const path = fromCategoryData.body.name['en-US'];
        newPathnames.splice(newPathnames.length - 1, 0, path);
      }

      setPathnames(newPathnames);
    };

    fetchData();
  }, [categoryId, cameFromCategory, location.pathname]);

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
      <Link to={'/'}>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <Link key={index} to={routeTo}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
