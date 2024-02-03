import { Dropdown, DropdownOption } from '../../../ui/Dropdown';
import { Label } from '../Label';
import { useField, useFormikContext } from 'formik';
import styles from './index.module.css';

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options: DropdownOption[];
}

export const Select = ({ label, name, placeholder, required, options }: SelectProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={styles.root}>
      <Label value={label} name={name} required={required} />
      <Dropdown
        className={meta.error && meta.touched ? styles.error : ''}
        style="border"
        width="full"
        options={options}
        placeholder={placeholder || "Select option"}
        onChange={(value) => setFieldValue(name, value)}
        value={field.value}
      />
    </div>
  );
};
