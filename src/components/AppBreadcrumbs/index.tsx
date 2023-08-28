import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Typography, Breadcrumbs } from '@mui/material';

import { getCategoryById } from '../../sdk/requests';
import { RouteLinks } from '../../utils/types';
import { useErrorHandling } from '../../hooks/useErrorHandling';

import { UserMessage } from '../UserMessage';

import styles from './AppBreadcrumb.module.css';

interface IPathname {
  name: string;
  isCategory: string | null;
}

export const AppBreadcrumbs: FC = () => {
  const { pathname, search, state } = useLocation();
  const cameFromCategory = state?.fromCategory;
  const categoryId = new URLSearchParams(search).get('category');
  const [pathnames, setPathnames] = useState<IPathname[]>([]);

  const { errorState, closeError, handleError } = useErrorHandling();

  const pathParts = pathname
    .split('/')
    .filter((path) => path)
    .map((path) => ({
      name: path,
      isCategory: null as string | null,
    }));

  const handleCategoryInfo = async (id: string, isLastPath = false): Promise<void> => {
    try {
      const {
        body: { name, parent },
      } = await getCategoryById(id);

      const addToPathParts = (pathName: string, isCategory: string | null): void => {
        if (isLastPath) {
          pathParts.push({ name: pathName, isCategory });
        } else {
          pathParts.splice(pathParts.length - 1, 0, { name: pathName, isCategory });
        }
      };

      if (parent) {
        const parentInfo = await getCategoryById(parent.id);
        addToPathParts(parentInfo.body.name['en-US'], parent.id);
      }

      addToPathParts(name['en-US'], id);
    } catch (error) {
      handleError(error as Error);
    }
  };

  const fetchData = async (): Promise<void> => {
    // if user is browsing a certain category
    if (categoryId) {
      await handleCategoryInfo(categoryId, true);
    }

    // if user came to product page from a certain category
    if (cameFromCategory) {
      await handleCategoryInfo(cameFromCategory);
    }
    setPathnames(pathParts);
  };

  useEffect(() => {
    closeError();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, cameFromCategory, pathname]);

  const isHideRoute = [RouteLinks.Main, RouteLinks.Login, RouteLinks.Register].includes(pathname as RouteLinks);

  if (isHideRoute) return null;

  return (
    <>
      <Breadcrumbs className={styles.wrapper} separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
        <Link className={styles.link} to={'/'}>
          home
        </Link>
        {pathnames.map(({ name, isCategory }, index) => {
          const names = pathnames.map((item) => item.name);
          const routeTo = `/${names.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const pathName = name.toLocaleLowerCase();

          if (isLast) {
            return <Typography key={pathName}>{pathName}</Typography>;
          }

          if (isCategory) {
            return (
              <Link className={styles.link} key={pathName} to={`${RouteLinks.Catalog}?category=${isCategory}`}>
                {pathName}
              </Link>
            );
          }

          return (
            <Link className={styles.link} key={pathName} to={routeTo}>
              {pathName}
            </Link>
          );
        })}
      </Breadcrumbs>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
    </>
  );
};
