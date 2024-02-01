import { Input } from "../../components/Input"
import { ListItem } from "./ListItem"
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { showErrorToast, showSuccessToast } from "../../services/toaster";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { ListItemType } from "../../types";

export const TodoList = () => {
  const dbList = useLiveQuery(() => db.list.orderBy('order').toArray());
  const [list, setList] = useState<ListItemType[]>([]);

  useEffect(() => {
    if (dbList) {
      setList(dbList);
    }
  }, [dbList]);
  
  const maxOrder = list?.reduce((acc, cur) => Math.max(acc, cur.order), 0);

  const onAdd = async (value: string) => {
    try {
      await db.list.add({
        text: value,
        isDone: false,
        order: maxOrder ? maxOrder + 1 : 1
      });

      showSuccessToast(`Successfully added to the list`);
    } catch (error) {
      showErrorToast(`Failed to add to the list`);
    }
  }
  const onDragEnd = async (result: any) => {
    const { draggableId, destination, source } = result;

    if (!list || !destination || destination.index === source.index) {
      return;
    }

    const newList = Array.from(list);
    const [reorderedItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, reorderedItem);

    setList(newList);

    const updates = newList.map((item, index) => {
      if (item.order !== index) {
        if(!item.id) return Promise.resolve();
        return db.list.update(item.id, { order: index });
      }
      return Promise.resolve();
    });

    try {
      await Promise.all(updates);
      showSuccessToast(`List successfully updated.`);
    } catch (error) {
      showErrorToast(`Failed to update the list`);
    }

  };

  return (
    <>
      <Input onSubmit={onAdd} />
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list?.map((listItem, index) => (
                <Draggable 
                  key={listItem.id} 
                  draggableId={String(listItem.id)} 
                  index={index}
                >
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                    >
                      <ListItem listItem={listItem} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {!list?.length && (
        <p>There is no item in the list</p>
      )}
    </>
  )
}