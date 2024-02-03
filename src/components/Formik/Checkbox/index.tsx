import { Checkbox as DefaultCheckbox } from '../../../ui/Checkbox';
import { Label } from '../Label';
import styles from './index.module.css';
import { useField, useFormikContext } from 'formik';

interface CheckboxProps {
  name: string;
  label: string;
  disabled?: boolean;
}

export const Checkbox = ({ name, label, disabled }: CheckboxProps) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={styles.root}>
      <DefaultCheckbox
        disabled={disabled}
        checked={field.value}
        label={label}
        onChange={() => setFieldValue(name, !field.value)}
      />
    </div>
  );
};
