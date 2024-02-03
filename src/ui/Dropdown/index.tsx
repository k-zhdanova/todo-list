import { useMemo, useState } from 'react';
import styles from './index.module.css';
import cn from 'classnames';
import { ReactComponent as CarretIcon } from '../../assets/icons/carret.svg';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export interface DropdownOption {
  label: string;
  value: string;
  color?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  className?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  style?: 'shadow' | 'border';
  width?: 'full' | 'auto';
}

export const Dropdown = ({
  options,
  className,
  placeholder,
  onChange,
  value,
  style = 'shadow',
  width = 'auto',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );
  const { ref } = useOutsideClick(() => setIsOpen(false));

  return (
    <div className={cn(styles.root, styles[style], styles[width])} ref={ref}>
      <div
        className={cn(styles.selectedOption, className)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={cn(styles.value, {
          [styles.withColor]: !!selectedOption?.color,
        })}>
          {selectedOption?.color && 
            <div 
              className={styles.colorBadge} 
              style={{backgroundColor: selectedOption?.color}} 
            />
          }
          
          {selectedOption?.label || placeholder}
        </div>

        <CarretIcon />
      </div>

      {isOpen && 
        <div className={styles.options}>
          {options.map((option) => 
            <div
              className={cn(
                styles.option,
                selectedOption?.value === option.value && styles.selected,
              )}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.color && 
                <div 
                  className={styles.colorBadge} 
                  style={{backgroundColor: option.color}} 
                />
              }

              {option.label}
            </div>,
          )}
        </div>
      }
    </div>
  );
};
