import cn from 'classnames';
import useModal from "../../../hooks/useModal";
import { db } from "../../../services/db";
import { showErrorToast, showSuccessToast } from "../../../services/toaster";
import { Checkbox } from "../../../ui/Checkbox";
import Modal from "../../../ui/Modal";
import styles from './index.module.css';
import { ListItemType } from "../types";
import { ListForm } from "../ListIForm";
import { IconButton } from "../../../ui/Button";
import { ReactComponent as DraggableIcon } from '../../../assets/icons/draggable.svg'
import { CATEGORIES, MESSAGES } from '../constants';
import ConfirmationModal from '../../../components/ConfirmationModal';

export const ListItem = ({ listItem }: { listItem: ListItemType }) => {
  const categoryColor = CATEGORIES.find((category) => category.value === listItem.category)?.color;

  const handleCheck = () => {
    if (!listItem.id) return;

    db.list.update(listItem.id, { isDone: !listItem.isDone });
  }

  const ItemContent = (
    <div className={styles.itemContentWrapper}>
      <div className={styles.itemContent}>
        <span>{listItem.title}</span>
        <span>{listItem.description}</span>
      </div>
      {listItem.category &&
        <div
          className={styles.categoryBadge}
          style={{ backgroundColor: categoryColor }}
        >
          {listItem.category}
        </div>
      }
    </div>
  )

  return (
    <>
      <div className={cn(styles.root, {
        [styles.done]: listItem.isDone
      })}>
        <div className={styles.content}>
          <DraggableIcon className={styles.draggableIcon} />
          <Checkbox label={ItemContent} checked={listItem.isDone} onChange={handleCheck} />
        </div>
        <div className={styles.actions}>
          <EditButton listItem={listItem} />
          <DeleteButton listItem={listItem} />
        </div>
      </div>
    </>
  )
}

const DeleteButton = ({ listItem }: { listItem: ListItemType }) => {
  const { isOpen, toggle } = useModal();

  const handleDelete = () => {
    if (!listItem.id) return;

    try {
      db.list.delete(listItem.id);
      showSuccessToast(MESSAGES.DELETE.SUCCESS);
    } catch (error) {
      showErrorToast(MESSAGES.DELETE.ERROR);
    }
  }

  return (
    <>
      <IconButton
        style="alert"
        action="delete"
        onClick={toggle}
      >
        DELETE
      </IconButton>

      <ConfirmationModal 
        isOpen={isOpen} 
        onClose={toggle} 
        onConfirm={handleDelete} 
      />
    </>
  )
}

const EditButton = ({ listItem }: { listItem: ListItemType }) => {
  const { isOpen, toggle } = useModal();

  const handleEdit = async (values: ListItemType) => {
    if (!listItem.id) return;

    try {
      await db.list.update(listItem.id, values);
      toggle();
      showSuccessToast(MESSAGES.EDIT.SUCCESS);
    } catch (error) {
      showErrorToast(MESSAGES.EDIT.ERROR);
    }
  }

  return (
    <>
      <IconButton
        style="secondary"
        action="edit"
        onClick={toggle}
      >
        EDIT
      </IconButton>

      <Modal 
        isOpen={isOpen} 
        onClose={toggle}
      >
        <ListForm 
          listItem={listItem} 
          onSubmit={handleEdit} 
        />
      </Modal>
    </>
  )
}