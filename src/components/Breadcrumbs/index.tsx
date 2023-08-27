import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const AppBreadcrumbs: FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const query = new URLSearchParams(location.search);

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
      <Link to='/'>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name} color='textPrimary'>
            {name}
          </Typography>
        ) : (
          <Link key={name} to={routeTo}>
            {name}
          </Link>
        );
      })}
      {query.get('category') && <Typography color='textPrimary'>{query.get('category')}</Typography>}
    </Breadcrumbs>
  );
};
