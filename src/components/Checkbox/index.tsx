import React, { useState } from 'react';
import checkIcon from '../../assets/icons/check.svg';
import { StyledCheckbox } from './index.style';

interface CheckboxProps {
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

export const Checkbox = ({ disabled, checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  return (
    <StyledCheckbox
      className={isChecked ? 'checked' : ''}
      onClick={() => {
        if (!disabled) {
          setIsChecked((prev) => !prev);
        }
        if (onChange) {
          onChange(!isChecked);
        }
      }}>
        <img src={checkIcon} alt="check" />
    </StyledCheckbox>
  );
};
