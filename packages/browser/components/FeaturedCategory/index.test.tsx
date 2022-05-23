import React from 'react';
import { render } from '@testing-library/react';
import FeaturedCategory from '.';
import fileMock from '../../mocks/fileMock';
describe('FeaturedCategory', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('render ', async () => {
    expect.assertions(2);
    const content = 'Wireless Connection With TV, Computer, Laptop..';
    const { container } = render(
      <FeaturedCategory
        imageSrc={fileMock}
        content={content}
      />,
      {},
    );

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
