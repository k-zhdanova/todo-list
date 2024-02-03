import styles from './index.module.css';
import cn from 'classnames';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import React from 'react';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?:
  | 'plain'
  | 'primary'
  | 'secondary'
  | 'alert';
}

export const Button = ({
  className = '',
  children,
  onClick,
  style = 'primary',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(styles.root, styles[style], className)}
      onClick={onClick}>
      {children}
    </button>
  );
};

interface IconButtonProps extends ButtonProps {
  action?: 'add' | 'edit' | 'delete' | 'close';
}

const IconType = {
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  close: CloseIcon,
} as const;

export const IconButton = ({
  style = 'primary',
  className,
  children,
  action,
  type = 'button',
  onClick,
}: IconButtonProps) => {
  const IconComponent = IconType[action!];

  return (
    <Button
      type={type}
      style={style}
      className={cn(!children ? styles.icon : '', className)}
      onClick={onClick}>
      <IconComponent className={styles.icon}/>
      {children && <span>{children}</span>}
    </Button>
  );
};
