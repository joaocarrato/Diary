import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Initial from '..';

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

describe('InitialPage', () => {
  it('Should render correctly', () => {
    render(<Initial />);
  });

  it('Input should accept data', () => {
    const { getByPlaceholderText } = render(<Initial />);

    fireEvent.changeText(
      getByPlaceholderText('Enter with your name...'),
      'Olá',
    );
  });

  it('Should have title', () => {
    const { getByText, debug } = render(<Initial />);

    getByText(
      'Unleash Your Thoughts, Capture Your Moments. Your Personal Diary, Always by Your Side.',
    );
    debug();
  });
});
