import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('sanity check', () => {
  expect(1).toBe(1);
});

test('debugs whole app', () => {
  render(<App />);
  screen.debug();
});
