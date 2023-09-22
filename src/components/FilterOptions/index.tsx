import { Box, Button, Drawer, Stack } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PriceSlider } from './PriceSlider';
import { RadioGroupEl } from './RadioGroupEl';

import styles from './FilterOptions.module.css';

const INITIAL_PRICE_RANGE = [1, 1500];
const QUERY_REGEX = /(?=variants\.)/;
const PRICE_QUERY_REGEX = /range\((\d+)00 to (\d+)00\)/;
const FILTER_QUERY = 'filter';

const initialAttributes = {
  metal: '',
  gemstone: '',
  style: '',
};

type FilterType = 'metal' | 'gemstone' | 'style';

const availableOptions: Record<FilterType, string[]> = {
  metal: ['gold', 'silver'],
  gemstone: ['ruby', 'emerald'],
  style: ['everyday', 'for special occasions'],
};

const queryStrings: Record<FilterType, (value: string) => string> = {
  metal: (metal) => `variants.attributes.metal:"${metal}"`,
  gemstone: (gemstone) => `variants.attributes.gemstones:"${gemstone}"`,
  style: (style) => `variants.attributes.style:"${style}"`,
};

const setPriceString = (range: number[]): string => `variants.price.centAmount:range(${range[0]}00 to ${range[1]}00)`;

export const FilterOptions: FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>(INITIAL_PRICE_RANGE);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<FilterType, string>>({ ...initialAttributes });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const filterQuery = searchParams.get(FILTER_QUERY);

  const resetFilters = (): void => {
    setPriceRange(INITIAL_PRICE_RANGE);
    setSelectedAttributes({ ...initialAttributes });
  };

  useEffect(() => {
    resetFilters();
    if (filterQuery) {
      filterQuery.split(QUERY_REGEX).forEach((filter) => {
        const priceMatch = filter.match(PRICE_QUERY_REGEX);

        if (priceMatch) {
          const [minPrice, maxPrice] = priceMatch.slice(1).map(Number);
          setPriceRange([minPrice, maxPrice]);
        }

        Object.keys(availableOptions).forEach((filterVar) => {
          const match = availableOptions[filterVar as FilterType].find((option) => filter.includes(queryStrings[filterVar as FilterType](option)));

          if (match) {
            setSelectedAttributes((prev) => ({
              ...prev,
              [filterVar as FilterType]: match,
            }));
          }
        });
      });
    }
  }, [filterQuery, search]);

  const handleSetFilters = (): void => {
    const selectedFilters: string[] = [];

    Object.keys(selectedAttributes).forEach((attr) => {
      if (selectedAttributes[attr as FilterType]) {
        selectedFilters.push(queryStrings[attr as FilterType](selectedAttributes[attr as FilterType]));
      }
    });

    selectedFilters.push(setPriceString(priceRange));
    searchParams.set(FILTER_QUERY, selectedFilters.join(' '));
    navigate({ search: searchParams.toString() });
    setIsSidebarOpen(false);
  };

  const handleReset = (): void => {
    resetFilters();
    searchParams.delete(FILTER_QUERY);
    navigate(`?${searchParams.toString()}`, { replace: true });
    setIsSidebarOpen(false);
  };

  const handleResetOneFilter = (attr: FilterType): void => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attr]: '',
    }));
  };

  return (
    <Box sx={{ width: 100 }}>
      <Button variant='text' onClick={(): void => setIsSidebarOpen(true)}>
        Filters
      </Button>
      <Drawer anchor='right' open={isSidebarOpen} onClose={(): void => setIsSidebarOpen(false)}>
        <Stack className={styles.filtersWrapper}>
          <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          {Object.keys(availableOptions).map((filterType) => (
            <RadioGroupEl
              key={filterType}
              value={selectedAttributes[filterType as FilterType]}
              handleReset={(): void => handleResetOneFilter(filterType as FilterType)}
              onChange={(e): void => setSelectedAttributes({ ...selectedAttributes, [filterType as FilterType]: e.target.value })}
              options={availableOptions[filterType as FilterType]}
              label={filterType}
            />
          ))}
          <Box className={styles.btnWrapper}>
            <Button variant='contained' onClick={handleSetFilters}>
              Set filters
            </Button>
            <Button variant='contained' onClick={handleReset}>
              Reset all
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
};
