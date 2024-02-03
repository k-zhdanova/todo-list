import { ListItem } from "./ListItem"
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../services/db";
import { showErrorToast, showSuccessToast } from "../../services/toaster";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { FilterStatuses, FilterType, ListItemType } from "./types";
import styles from './index.module.css';
import { IconButton } from "../../ui/Button";
import Modal from "../../ui/Modal";
import useModal from "../../hooks/useModal";
import { ListForm } from "./ListIForm";
import { Dropdown } from "../../ui/Dropdown";
import { CATEGORIES, FILTER_OPTIONS } from "./constants";
import classNames from "classnames";
import { useScrollWithShadow } from "../../hooks/useScrollWithShadow";

const defaultFilter: FilterType = {
  status: 'all',
  category: ''
}

export const TodoList = () => {
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [list, setList] = useState<ListItemType[]>([]);
  const { isOpen, toggle } = useModal();
  const { boxShadow, onScrollHandler } = useScrollWithShadow();

  const dbList = useLiveQuery(
    () => db.list
      .orderBy('order')
      .filter(item => {
        const statusFilter = (() => {
          switch (filter.status) {
            case 'completed': return item.isDone === true;
            case 'active': return item.isDone === false;
            case 'all':
            default:
              return true;
          }
        })();

        const categoryFilter = filter.category ? item.category === filter.category : true;

        return statusFilter && categoryFilter;
      })
      .toArray()
    , [filter])

  useEffect(() => {
    if (dbList) {

      dbList.sort((a, b) => {
        if (a.isDone === b.isDone) return 0;
        if (a.isDone) return 1;
        return -1;
      });

      setList(dbList);
    }
  }, [dbList]);

  const maxOrder = list?.reduce((acc, cur) => Math.max(acc, cur.order), 0);

  const handleAdd = async (values: ListItemType) => {
    try {
      await db.list.add({
        ...values,
        order: maxOrder ? maxOrder + 1 : 1
      });

      toggle();
      showSuccessToast(`Successfully added to the list`);
    } catch (error) {
      showErrorToast(`Failed to add to the list`);
    }
  }

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;

    if (!list || !destination || destination.index === source.index) {
      return;
    }

    const newList = Array.from(list);
    const [reorderedItem] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, reorderedItem);

    setList(newList);

    const updates = newList.map((item, index) => {
      if (item.order !== index) {
        if (!item.id) return Promise.resolve();
        return db.list.update(item.id, { order: index });
      }
      return Promise.resolve();
    });

    await Promise.all(updates);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <IconButton
          style="primary"
          action="add"
          onClick={toggle}
        >
          ADD
        </IconButton>

        <div className={styles.filters}>
          <div className={styles.dropdownWrapper}>
            <span>Category:</span>
            <Dropdown
              options={[
                { value: '', label: 'All' },
                ...CATEGORIES
              ]}
              value={filter.category}
              onChange={(value) => setFilter((prev) => {
                return {
                  ...prev,
                  category: value
                }
              })}
            />
          </div>

          <div className={styles.dropdownWrapper}>
            <span>Status:</span>
            <Dropdown
              options={FILTER_OPTIONS}
              value={filter.status}
              onChange={(value) => setFilter((prev) => {
                return {
                  ...prev,
                  status: value as FilterStatuses
                }
              })}
            />
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId="list">
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps} 
            >
              {list?.map((listItem, index) => (
                <Draggable
                  key={listItem.id}
                  draggableId={String(listItem.id)}
                  index={index}
                  isDragDisabled={listItem.isDone}
                >
                  {(provided, snapshot) => (
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
        <p className={styles.emptyListMessage}>There is no item in the list</p>
      )}

      <Modal isOpen={isOpen} onClose={toggle}>
        <ListForm onSubmit={handleAdd} />
      </Modal>
    </div>
  )
}