import { Checkbox as DefaultCheckbox } from '../../../ui/Checkbox';
import styles from './index.module.css';
import { useField, useFormikContext } from 'formik';

interface CheckboxProps {
  name: string;
  label: string;
}

export const Checkbox = ({ name, label }: CheckboxProps) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={styles.root}>
      <DefaultCheckbox
        checked={field.value}
        label={label}
        onChange={() => setFieldValue(name, !field.value)}
      />
    </div>
  );
};
