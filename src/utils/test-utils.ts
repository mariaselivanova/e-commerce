import { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui: ReactElement): RenderResult => render(ui, { wrapper: MemoryRouter });

export * from '@testing-library/react';
export { customRender as render };
