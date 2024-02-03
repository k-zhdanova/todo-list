import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';
import { IconButton } from '../Button';

interface ModalType {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalType) {
  if (!isOpen) return null;

  const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalWrapper} onClick={onWrapperClick}>
      <div className={styles.modal}>
        <IconButton
          style="plain"
          className={styles.closeBtn}
          onClick={onClose}
          action="close"
        />
        {children}
      </div>
    </div>,
    document.body,
  );
}
