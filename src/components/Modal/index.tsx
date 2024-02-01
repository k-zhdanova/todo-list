
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ModalContent, ModalOverlay, ModalWrapper } from "./index.style"

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
    <ModalOverlay onClick={onWrapperClick}>
      <ModalWrapper>
        <ModalContent>
          <button onClick={onClose}>xxx</button>
          {children}
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>,
    document.body,
  );
}
