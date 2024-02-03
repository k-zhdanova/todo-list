import Dexie, { Table } from 'dexie';
import { ListItemType } from '../modules/TodoList/types';

const DB_NAME = 'todoList';

export class ListService extends Dexie {
  list!: Table<ListItemType>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      list: '++id, title, description, category, isDone, order'
    });
  }
}

export const db = new ListService();