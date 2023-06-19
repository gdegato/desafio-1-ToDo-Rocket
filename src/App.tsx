import './global.css'
import { Header } from './components/Header'
import styles from './App.module.css'
import { TodoPage } from './components/TodoPage'


function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <TodoPage
          />

        </main>

      </div>
    </>
  )
}

export default App
