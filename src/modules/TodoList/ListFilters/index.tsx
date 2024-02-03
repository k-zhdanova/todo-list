import styles from './index.module.css';
import { FilterStatuses, FilterType } from "../types";
import { CATEGORIES, FILTER_OPTIONS } from "../constants";
import { Dropdown } from "../../../ui/Dropdown";

interface ListFiltersProps {
  filter: FilterType;
  onChange: (filter: Partial<FilterType>) => void;
}

export const ListFilters = ({filter, onChange}: ListFiltersProps) => (
  <div className={styles.root}>
    <div className={styles.dropdownWrapper}>
      <span>Category:</span>
      <Dropdown
        options={[
          { value: '', label: 'All' },
          ...CATEGORIES
        ]}
        value={filter.category}
        onChange={(value) => onChange({category: value})}
      />
    </div>

    <div className={styles.dropdownWrapper}>
      <span>Status:</span>
      <Dropdown
        options={FILTER_OPTIONS}
        value={filter.status}
        onChange={(value) => onChange({status: value as FilterStatuses})}
      />
    </div>
  </div>
);