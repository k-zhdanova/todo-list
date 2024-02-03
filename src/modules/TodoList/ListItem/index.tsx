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
import { CATEGORIES } from '../constants';

export const ListItem = ({ listItem }: { listItem: ListItemType }) => {
  const { isOpen, toggle } = useModal();

  const categoryColor = CATEGORIES.find((category) => category.value === listItem.category)?.color;

  const handleDelete = () => {
    if (!listItem.id) return;

    try {
      db.list.delete(listItem.id);
      showSuccessToast(`Successfully deleted`);
    } catch (error) {
      showErrorToast(`Failed to delete`);
    }
  }

  const handleEdit = async (values: ListItemType) => {
    if (!listItem.id) return;

    try {
      await db.list.update(listItem.id, values);
      toggle();
      showSuccessToast(`Successfully edited`);
    } catch (error) {
      showErrorToast(`Failed to edit`);
    }
  }

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
      <div 
        className={styles.categoryBadge} 
        style={{ backgroundColor: categoryColor }}
      >
        {listItem.category}
      </div>
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
          <IconButton
            style="secondary"
            action="edit"
            onClick={toggle}
          >
            EDIT
          </IconButton>
          <IconButton
            style="alert"
            action="delete"
            onClick={handleDelete}
          >
            DELETE
          </IconButton>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={toggle}>
        <ListForm listItem={listItem} onSubmit={handleEdit} />
      </Modal>
    </>
  )
}
