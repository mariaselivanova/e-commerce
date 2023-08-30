import { Box, Button, Popover, Stack } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { PriceSlider } from './PriceSlider';
import { RadioGroupEl } from './RadioGroupEl';

import styles from './FilterOptionsInputs.module.css';

type Metal = 'gold' | 'silver' | '';
type Gemstone = 'ruby' | 'emerald' | '';

const metals = ['gold', 'silver'];
const gemstones = ['ruby', 'emerald'];

const queryStrings = {
  ruby: `variants.attributes.ruby:"true"`,
  emerald: `variants.attributes.emerald:"true"`,
  gold: `variants.attributes.gold:"true"`,
  silver: `variants.attributes.silver:"true"`,
  price: (range: number[]): string => `variants.price.centAmount:range(${range[0]}00 to ${range[1]}00)`,
};

export const FilterOptions: FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([1, 1500]);
  const [selectedMetal, setSelectedMetal] = useState<Metal>('');
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone>('');
  const [filters, setFilters] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const filterQuery = searchParams.get('filter');

  const resetFilters = (): void => {
    setFilters([]);
    setSelectedGemstone('');
    setSelectedMetal('');
    setPriceRange([1, 1500]);
  };

  useEffect(() => {
    if (filterQuery) {
      filterQuery.split(/(?=variants\.)/).forEach((filter) => {
        const priceMatch = filter.match(/range\((\d+)00 to (\d+)00\)/);
        switch (true) {
          case filter.includes('price'):
            if (priceMatch) {
              const minPrice = parseInt(priceMatch[1], 10);
              const maxPrice = parseInt(priceMatch[2], 10);
              setPriceRange([minPrice, maxPrice]);
            }
            break;

          case filter.includes(queryStrings.gold):
            setSelectedMetal('gold');
            break;

          case filter.includes(queryStrings.silver):
            setSelectedMetal('silver');
            break;

          case filter.includes(queryStrings.ruby):
            setSelectedGemstone('ruby');
            break;

          case filter.includes(queryStrings.emerald):
            setSelectedGemstone('emerald');
            break;

          default:
            break;
        }
      });
    } else {
      resetFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = (): void => {
    setAnchorEl(null);
  };

  const handleSetFilters = (): void => {
    resetFilters();

    const selectedAttributes: string[] = [];

    if (Array.isArray(priceRange)) {
      selectedAttributes.push(queryStrings.price(priceRange));
    }

    if (selectedMetal) {
      selectedAttributes.push(queryStrings[selectedMetal]);
    }

    if (selectedGemstone) {
      selectedAttributes.push(queryStrings[selectedGemstone]);
    }

    filters.push(...selectedAttributes);

    searchParams.set('filter', filters.join(' '));
    navigate({ search: searchParams.toString() });
    handleCloseOptions();
  };

  const handleReset = (): void => {
    resetFilters();
    handleCloseOptions();
    searchParams.delete('filter');
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ width: 100 }}>
      <Button variant='text' endIcon={<ArrowDropDownIcon fontSize='small' />} onClick={handleClickOptions}>
        Filters
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseOptions}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack display={'flex'} className={styles.popover}>
          <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          <RadioGroupEl
            value={selectedMetal}
            onChange={(event): void => setSelectedMetal(event.target.value as Metal)}
            options={metals}
            label='Metal'
          />
          <RadioGroupEl
            value={selectedGemstone}
            onChange={(event): void => setSelectedGemstone(event.target.value as Gemstone)}
            options={gemstones}
            label='Gemstones'
          />
          <Box className={styles.btnWrapper}>
            <Button variant='contained' onClick={handleSetFilters}>
              Set filters
            </Button>
            <Button variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Stack>
      </Popover>
    </Box>
  );
};
