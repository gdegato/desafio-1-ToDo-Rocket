import styles from './Header.module.css'

import todoLogo from '../assets/images/logo-todo.svg'

export function Header() {
    return (
      <header className={styles.header}>
        <img src={todoLogo} alt='Logotipo do Ignite' />
      </header>
    )
  }
  