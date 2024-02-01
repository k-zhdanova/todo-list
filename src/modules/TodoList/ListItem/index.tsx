import useModal from "../../../hooks/useModal";
import { ListItemType } from "../../../types";
import { Checkbox } from "../../../components/Checkbox";
import Modal from "../../../components/Modal"
import { StyledListItem } from "./index.style"
import { db } from "../../../services/db";
import { showErrorToast, showSuccessToast } from "../../../services/toaster";

export const ListItem = ({listItem}: {listItem: ListItemType}) => {
  const { isOpen, toggle } = useModal();

  const moveListItem = async (dragIndex: number, hoverIndex: number) => {
    if(!listItem.id) return;

    try {
      await db.list.update(listItem.id, { order: hoverIndex });
      showSuccessToast(`Successfully updated the list`);
    } catch (error) {
      showErrorToast(`Failed to update the list`);
    }
  }

  const handleDelete = () => {
    if(!listItem.id) return;

    try {
      db.list.delete(listItem.id);
      showSuccessToast(`Successfully deleted from the list`);
    } catch (error) {
      showErrorToast(`Failed to delete from the list`);
    }
  }

  return (
    <>
      <StyledListItem>
        <Checkbox checked={listItem.isDone} />
        <label>{listItem.text}</label>

        <button onClick={toggle}>EDIT</button>
        <button onClick={handleDelete}>DELETE</button>
      </StyledListItem>

      <Modal isOpen={isOpen} onClose={toggle}>
        <h1>Modal</h1>
      </Modal>
    </>
  )
}
