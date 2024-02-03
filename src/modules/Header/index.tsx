import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './index.module.css';

export const Header = () => {
  return (
    <header className={styles.root}>
      <Logo />
      <h1>To-Do App</h1>
    </header>
  )
}