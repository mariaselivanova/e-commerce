import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';

export const renderWithRouter = (ui: ReactElement): RenderResult => render(ui, { wrapper: BrowserRouter });
