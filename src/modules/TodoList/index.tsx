import { Input } from "../../components/Input"
import { ListItem } from "../../components/ListItem"
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { showErrorToast, showSuccessToast } from "../../services/toaster";

export const TodoList = () => {
  const list = useLiveQuery(() => db.list.toArray());

  const onAdd = async (value: string) => {
    try {
      await db.list.add({
        text: value,
        isDone: false,
      });

      showSuccessToast(`Successfully added to the list`);
    } catch (error) {
      showErrorToast(`Failed to add to the list`);
    }
  }

  return (
    <>
      <Input onSubmit={onAdd} />
      {list?.map((listItem) => (
        <ListItem key={listItem.id} listItem={listItem} />
      ))}

      {!list?.length && (
        <p>There is no item in the list</p>
      )}
    </>
  )
}