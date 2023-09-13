import React, { FC, useContext, useEffect, useState } from 'react';
import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination, Stack } from '@mui/material';

import { useErrorHandling } from '../../hooks/useErrorHandling';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { getCartById, searchProducts } from '../../sdk/requests';
import { UserContext } from '../../contexts/userContext';

import { UserMessage } from '../../components/UserMessage';
import { ProductList } from '../../components/ProductList';
import { CatalogMenu } from '../../components/CatalogMenu';
import { SortOptionsInput } from '../../components/SortOptionsInput';
import { FilterOptions } from '../../components/FilterOptions';
import { SearchInput } from '../../components/SearchInput';
import { OptionsDisplay } from '../../components/OptionsDisplay';

import styles from './CatalogPage.module.css';

enum ProductsPerPage {
  mobileScreen = 3,
  tabletScreen = 4,
  largeScreen = 6,
}

const INITIAL_PAGE_NUMBER = 1;

export const CatalogPage: FC = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [productList, setProductList] = useState<ProductProjection[]>([]);
  const [numberOfPages, setNumberOfPages] = useState(INITIAL_PAGE_NUMBER);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isInitialPage, setIsInitialPage] = useState(true);

  const { errorState, closeError, handleError } = useErrorHandling();
  const { isMobileScreen, isTabletScreen } = useWindowWidth();

  const params = new URLSearchParams(search);
  const categoryId = params.get('category');
  const sortOptions = params.get('sort');
  const filterOptions = params.get('filter');
  const searchOptions = params.get('search');
  const currentPageParam = params.get('page');
  const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : INITIAL_PAGE_NUMBER;

  const updatePageParam = (page: number): void => {
    params.set('page', String(page));
    navigate(`?${params.toString()}`);
  };

  const getCartInfo = async (): Promise<void> => {
    try {
      const {
        body: { lineItems },
      } = await getCartById(user.cart);
      setCartItems(lineItems);
    } catch (e) {
      handleError(e as Error);
    }
  };

  const calculateProductsPerPage = (): ProductsPerPage => {
    if (isMobileScreen) {
      return ProductsPerPage.mobileScreen;
    }

    if (isTabletScreen) {
      return ProductsPerPage.tabletScreen;
    }

    return ProductsPerPage.largeScreen;
  };

  const fetchData = async (page: number): Promise<void> => {
    closeError();
    const productsPerPage = calculateProductsPerPage();

    try {
      const {
        body: { results, total },
      } = await searchProducts(categoryId, sortOptions, filterOptions, searchOptions, (page - 1) * productsPerPage, productsPerPage);

      if (total) {
        setNumberOfPages(Math.ceil(total / productsPerPage));
      }

      await getCartInfo();
      setProductList(results);
    } catch (error) {
      handleError(error as Error);
    }
  };

  useEffect(() => {
    if (isInitialPage) {
      setIsInitialPage(false);
      return;
    }

    if (numberOfPages < currentPage) {
      updatePageParam(numberOfPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfPages]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    updatePageParam(INITIAL_PAGE_NUMBER);
    fetchData(INITIAL_PAGE_NUMBER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, filterOptions, searchOptions]);

  useEffect(() => {
    fetchData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileScreen, isTabletScreen, sortOptions, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    updatePageParam(value);
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
      <ProductList productList={productList} categoryId={categoryId} cartItems={cartItems} />
      {numberOfPages > INITIAL_PAGE_NUMBER && (
        <Pagination className={styles.pagination} page={currentPage} onChange={handlePageChange} count={numberOfPages} color='primary' />
      )}
    </>
  );
};
