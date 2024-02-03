import { DropdownOption } from "../../../ui/Dropdown";
import { FilterType } from "../types";

export const MESSAGES = {
  NO_FOUND: 'No tasks found',
  ADD: {
    SUCCESS: 'Task added successfully',
    ERROR: 'Error occurred while adding task'
  },
  EDIT: {
    SUCCESS: 'Task updated successfully',
    ERROR: 'Error occurred while updating task'
  },
  DELETE: {
    SUCCESS: 'Task deleted successfully',
    ERROR: 'Error occurred while deleting task'
  },
}

export const FILTER_OPTIONS: DropdownOption[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export const CATEGORIES: DropdownOption[] = [
  { value: 'work', label: 'Work', color: '#ffd470'},
  { value: 'personal', label: 'Personal', color: '#a1fa9d'},
  { value: 'shopping', label: 'Shopping', color: '#70d4ff'},
  { value: 'health', label: 'Health', color: '#fc8bed'},
  { value: 'finance', label: 'Finance', color: '#7aa1fa'},
  { value: 'travel', label: 'Travel', color: '#baffd2'},
  { value: 'home', label: 'Home', color: '#f4fc8b'},
  { value: 'others', label: 'Others', color: '#d4d4d4'},
];


export const DEFAULT_FILTER: FilterType = {
  status: 'all',
  category: ''
}
