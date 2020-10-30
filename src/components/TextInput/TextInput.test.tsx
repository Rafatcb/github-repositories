import type { RefObject } from 'react';
import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { ThemeManager } from '../../contexts/themeManager';

import type { TextInputRef } from './TextInput';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('should call onBlur', () => {
    const onBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeManager>
        <TextInput onBlur={onBlur} placeholder="My input" />
      </ThemeManager>,
    );
    const input = getByPlaceholderText('My input');

    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should call onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeManager>
        <TextInput onChangeText={onChangeText} placeholder="My input" />
      </ThemeManager>,
    );
    const input = getByPlaceholderText('My input');

    fireEvent.changeText(input, 'new text');
    expect(onChangeText).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('new text');
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeManager>
        <TextInput onFocus={onFocus} placeholder="My input" />
      </ThemeManager>,
    );
    const input = getByPlaceholderText('My input');

    fireEvent(input, 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should change ref.current.value', () => {
    const ref: RefObject<TextInputRef> = { current: {} } as RefObject<
      TextInputRef
    >;
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <ThemeManager>
        <TextInput
          ref={ref}
          onChangeText={onChangeText}
          placeholder="My input"
        />
      </ThemeManager>,
    );
    const input = getByPlaceholderText('My input');

    fireEvent.changeText(input, 'new text');
    expect(ref.current).toHaveProperty('value', 'new text');
  });

  it('should show error message', () => {
    const { queryByText } = render(
      <ThemeManager>
        <TextInput error="Some error" />
      </ThemeManager>,
    );

    expect(queryByText('Some error')).toBeDefined();
  });
});
