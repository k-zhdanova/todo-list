import styles from './index.module.css';

interface LabelProps {
  value?: string;
  name: string;
  required?: boolean;
}

export const Label = ({ value, required }: LabelProps) => {
  if (!value) return null;

  return (
    <div className={styles.root}>
      <span>{value}</span>
      {required && <span className={styles.required}>*</span>}
    </div>
  );
};
