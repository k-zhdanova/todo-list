import useModal from "../../hooks/useModal";
import { ListItemType } from "../../types";
import { Checkbox } from "../Checkbox";
import Modal from "../Modal"
import { StyledListItem } from "./index.style"
import { db } from "../../services/db";
import { showErrorToast, showSuccessToast } from "../../services/toaster";

export const ListItem = ({listItem}: {listItem: ListItemType}) => {
  const { isOpen, toggle } = useModal();

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