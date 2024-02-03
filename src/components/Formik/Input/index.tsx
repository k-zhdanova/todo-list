import { Field, useField } from 'formik';
import styles from './index.module.css';
import cn from 'classnames';
import { Label } from '../Label';

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Input = ({
  type,
  name,
  label,
  placeholder,
  required,
  disabled,
}: InputProps) => {
  const [_, meta] = useField(name);

  return (
    <div className={styles.root}>
      <Label value={label} name={name} required={required} />
      <div className={styles.inputWrapper}>
        <Field
          className={cn(styles.input, {
            [styles.error]: meta.error && meta.touched,
          })}
          placeholder={placeholder}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
