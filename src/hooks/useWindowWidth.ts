import { useState, useEffect } from 'react';

interface IWindowSize {
  windowWidth: number;
  isMobileScreen: boolean;
  isTabletScreen: boolean;
}

export const useWindowWidth = (): IWindowSize => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobileScreen = windowWidth < 780;
  const isTabletScreen = windowWidth >= 780 && windowWidth < 1168;

  return { windowWidth, isMobileScreen, isTabletScreen };
};
