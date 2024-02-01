import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggle };
};

export default useModal;
