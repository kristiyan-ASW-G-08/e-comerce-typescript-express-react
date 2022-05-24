import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notification from '.';

describe('Notification', () => {
  it('render Notification', () => {
    expect.assertions(1);
    const content = 'content';
    const type = 'message';
    const { container, getByText } = render(
      <Notification type={type} content={content} />,
    );

    expect(container).toBeTruthy();
  });
});
