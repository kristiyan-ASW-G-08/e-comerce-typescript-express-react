import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';
describe('Footer', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('render ', async () => {
    expect.assertions(2);
    const { container } = render(<Footer />, {});
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
