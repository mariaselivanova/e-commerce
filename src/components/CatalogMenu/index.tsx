import React, { FC, useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Category } from '@commercetools/platform-sdk';

import { IProductCategory, RouteLinks } from '../../utils/types';
import { useErrorHandling } from '../../hooks/useErrorHandling';
import { getAllCategories } from '../../sdk/requests';

import { CategoryLink } from '../CategoryLink';
import { UserMessage } from '../UserMessage';

import styles from './CatalogMenu.module.css';

export const CatalogMenu: FC = () => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const { errorState, closeError, handleError } = useErrorHandling();
  const sortCategories = (arr: Category[]): IProductCategory[] =>
    arr.reduce((acc, current) => {
      const currentCategoryName = current.name['en-US'];
      const parentCategoryName = current.parent?.obj?.name['en-US'] || currentCategoryName;
      const existingCategory = acc.find((entry) => entry.categoryName === parentCategoryName);

      const currentCategory = {
        categoryName: currentCategoryName,
        id: current.id,
        key: current.key,
      };

      if (existingCategory) {
        existingCategory.sub.push(currentCategory);
      } else {
        acc.push({
          categoryName: parentCategoryName,
          id: current.id,
          key: current.key,
          sub: currentCategoryName === parentCategoryName ? [] : [currentCategory],
        });
      }

      return acc;
    }, [] as IProductCategory[]);

  useEffect(() => {
    closeError();
    getAllCategories()
      .then((data) => setCategories(sortCategories(data.body.results)))
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(categories);

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <Stack className={styles.wrapper}>
        <Link to={RouteLinks.Catalog}>
          <Button size='large' className={styles.link}>
            All jewelry
          </Button>
        </Link>
        {categories.map(({ key, id, categoryName, sub }) => (
          <CategoryLink key={key} id={id} categoryName={categoryName} subcategories={sub} />
        ))}
      </Stack>
    </>
  );
};
