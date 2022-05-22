import React, { Dispatch, SetStateAction } from 'react';
import { render, waitFor } from '@testing-library/react';
import CarouselSlide from '.';
import userEvent from '@testing-library/user-event';

describe('CarouselSlide', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('render ', async () => {
    // expect.assertions(2);
    const heading = 'Browse Our Promotions';
    const imageSrc = '';
    const cardNum = 'card1';
    const content = 'Wireless Connection With TV, Computer, Laptop..';
    const setCurrentSlide = jest.fn() as Dispatch<SetStateAction<number>>;
    const { container, getByTestId } = render(
      <CarouselSlide
        heading={heading}
        content={content}
        buttonText={'someText'}
        setCurrentSlide={setCurrentSlide}
        currentSlide={0}
        imageSrc={imageSrc}
        color={'blue'}
      />,
      {},
    );

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
    const buttons = [0, 1, 2];
    buttons.forEach(buttonNum => {
      const button = getByTestId(`button-${buttonNum}`);
      userEvent.click(button);
      waitFor(() => {
        expect(setCurrentSlide).toHaveReturnedWith(buttonNum);
      });
    });
  });
});
