import { DropdownOption } from "../../ui/Dropdown";

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
  { value: 'entertainment', label: 'Entertainment', color: '#f7bec2'},
  { value: 'education', label: 'Education', color: '#fc8b98'},
  { value: 'travel', label: 'Travel', color: '#baffd2'},
  { value: 'home', label: 'Home', color: '#f4fc8b'},
  { value: 'others', label: 'Others', color: '#d4d4d4'},
];