import styles from './index.module.css';
import Modal from '../../ui/Modal';
import { ReactComponent as AlertIcon } from '../../assets/icons/alert.svg';
import { Button } from '../../ui/Button';

interface ConfirmationModalType {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmationModal({
  isOpen,
  onConfirm,
  onClose,
}: ConfirmationModalType) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.root}>
        <AlertIcon className={styles.iconWrapper} />
        <p>Are you sure you want to delete this item?</p>

        <div className={styles.btnWrapper}>
          <Button style="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button style="alert" onClick={onConfirm}>Ok</Button>
        </div>
      </div>
    </Modal>
  );
}
