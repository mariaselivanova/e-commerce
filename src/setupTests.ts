// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

global.fetch = jest.fn();

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });
