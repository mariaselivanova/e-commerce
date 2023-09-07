import React, { FC, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useLocation } from 'react-router-dom';
import { Pagination, Stack } from '@mui/material';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { searchProducts } from '../../sdk/requests';

import { UserMessage } from '../../components/UserMessage';
import { ProductList } from '../../components/ProductList';
import { CatalogMenu } from '../../components/CatalogMenu';
import { SortOptionsInput } from '../../components/SortOptionsInput';
import { FilterOptions } from '../../components/FilterOptions';
import { SearchInput } from '../../components/SearchInput';
import { OptionsDisplay } from '../../components/OptionsDisplay';

import styles from './CatalogPage.module.css';

const PRODUCTS_PER_PAGE = 6;
const INITIAL_PAGE_NUMBER = 1;

export const CatalogPage: FC = () => {
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const { errorState, closeError, handleError } = useErrorHandling();

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUMBER);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get('category');
  const sortOptions = params.get('sort');
  const filterOptions = params.get('filter');
  const searchOptions = params.get('search');

  const fetchData = async (page: number): Promise<void> => {
    closeError();
    try {
      const {
        body: { results, total },
      } = await searchProducts(categoryId, sortOptions, filterOptions, searchOptions, (page - 1) * PRODUCTS_PER_PAGE);

      if (total) {
        setNumberOfPages(Math.ceil(total / PRODUCTS_PER_PAGE));
      }

      setProductList(results);
    } catch (error) {
      handleError(error as Error);
    } finally {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    }
  };

  useEffect(() => {
    fetchData(INITIAL_PAGE_NUMBER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    fetchData(value);
  };

  return (
    <>
      {errorState.isError && (
        <UserMessage severity='error' open={errorState.isError} onClose={closeError}>
          {errorState.errorMessage}
        </UserMessage>
      )}
      <CatalogMenu />
      <Stack spacing={2} direction='row' className={styles.wrapper}>
        <OptionsDisplay option={searchOptions} param='search' />
        <SearchInput />
        <SortOptionsInput />
        <FilterOptions />
      </Stack>
      <ProductList productList={productList} categoryId={categoryId} />
      {numberOfPages > INITIAL_PAGE_NUMBER && (
        <Pagination className={styles.pagination} page={currentPage} onChange={handlePageChange} count={numberOfPages} color='primary' />
      )}
    </>
  );
};
