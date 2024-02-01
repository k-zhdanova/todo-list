import Dexie, { Table } from 'dexie';
import { ListItemType } from '../types';

const DB_NAME = 'todoList';

export class ListService extends Dexie {
  list!: Table<ListItemType>;

  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      list: '++id, text, isDone'
    });
  }
}

export const db = new ListService();