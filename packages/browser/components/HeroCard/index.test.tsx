import React from 'react';
import { render } from '@testing-library/react';
import HeroCard from '.';
import fileMock from '../../mocks/fileMock';
describe('HeroCard', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('render ', async () => {
    // expect.assertions(2);
    const heading = 'Browse Our Promotions';
    const imageSrc = 'some.svg';
    const cardNum = 'card1';
    const content = 'Wireless Connection With TV, Computer, Laptop..';
    const { container } = render(
      <HeroCard
        heading={heading}
        imageSrc={fileMock}
        cardNum={cardNum}
        content={content}
      />,
      {},
    );

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
