import { useEffect, useState } from 'react';
import styles from './index.module.css';
import cn from 'classnames';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';

interface CheckboxProps {
  checked?: boolean;
  label?: React.ReactNode;
  onChange?: (value: boolean) => void;
}

export const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className={styles.root} onClick={handleClick}>
      <div
        className={cn(styles.checkbox, {
          [styles.checked]: isChecked,
        })}
      >
        <CheckIcon />
      </div>
      {label && label}
    </div>
  );
};
