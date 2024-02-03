import { useField, useFormikContext } from 'formik';
import styles from './index.module.css';
import cn from 'classnames';
import { Label } from '../Label';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Textarea = ({
  name,
  label,
  placeholder,
  required,
  disabled,
}: InputProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  
  return (
    <div className={styles.root}>
      <Label value={label} name={name} required={required} />
      <textarea
        rows={6}
        value={field.value}
        onChange={(e) => setFieldValue(name, e.target.value)}
        className={cn(styles.textarea, {
          [styles.error]: meta.error && meta.touched,
        })}
        placeholder={placeholder}
        name={name}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
