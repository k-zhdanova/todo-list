export interface ListItemType {
  id?: number;
  title: string;
  description: string;
  category?: string;
  isDone: boolean;
  order: number;
}

export type FilterStatuses = 'all' | 'completed' | 'active';

export interface FilterType {
  status: FilterStatuses;
  category: string;
}
