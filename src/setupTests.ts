// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { server } from './mocks/server';

beforeAll(() => {
	// Establish API mocking before all tests.
	server.listen({ onUnhandledRequest: "bypass" });
});

afterEach(() => {
	cleanup();
	jest.resetAllMocks();

  server.restoreHandlers();
});

afterAll(() => {
	server.close();
});
