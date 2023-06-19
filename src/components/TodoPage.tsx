import styles from './TodoPage.module.css'
import { PlusCircle } from '@phosphor-icons/react'
import { Task, TaskType } from './Task'
import { useState, FormEvent, ChangeEvent } from 'react'


export function TodoPage() {

    const [tasks, setTasks] = useState<TaskType[]>([]); //criar uma lista de tarefas

    const [newTask, setNewTask] = useState(''); //criar uma nova tarefa

    const [taskCount, setTaskCount] = useState(0); //contar as tarefas criadas

    const [taskIsFinished, setTaskFinished] = useState(0); //contar as tarefas concluídas

    function handleSubmit(e: FormEvent) { //enviar a nova tarefa no submit do formulario
        e.preventDefault();
        const newTaskText: TaskType = { //passando as propriedades obrigatorias ao criar uma nova tarefa
            content: newTask,
            id: tasks.length + 1
        }
        setTasks([...tasks, newTaskText])
        setNewTask('')//limpar o input após submeter a nova tarefa
    }

    function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) { //pegar os dados do input quando criar uma nova task
        e.target.setCustomValidity('')
        setNewTask(e.target.value)
    }

    function handleTaskCount() { // contador de tarefas criadas
        setTaskCount((previousTask) => {
            return previousTask + 1
        })
    }

    function handleDeleteTask(taskIdToDelete: number) { // deletar tarefas
        const tasksWithoutDeletedOne = tasks.filter((task) => {
            return task.id !== taskIdToDelete
        })
        setTasks(tasksWithoutDeletedOne)
        setTaskCount(tasksWithoutDeletedOne.length)
    }

    function handleTaskFinished() { // contador de tarefas concluidas      
        const checkedTask = tasks.filter((task) => {
            return task.checked === true
        })
        setTaskFinished(checkedTask.length)


        /*  setTaskIsFinished((checkedTask) => {
             return checkedTask + 1
         })
         console.log(setTaskIsFinished) */
    }

    /*   function handleTaskChecked() { // contador de tarefas concluidas
  
          //contar a quantidade de tarefas que estão com checked
  
          setTaskChecked((previousTask) => {
              return previousTask + 1
          })
      } */


    const isNewCommentEmpty = newTask.length === 0;

    return (
        <>
            <div className={styles.todoContainer}>
                <div className={styles.todoForm}>
                    <form
                        className={styles.inputForm}
                        onSubmit={handleSubmit}
                        onSubmitCapture={handleTaskCount}
                    >
                        <div>
                            <input
                                type="text"
                                placeholder='Adicione uma nova tarefa'
                                name="task"
                                value={newTask}
                                onChange={handleNewTaskChange}
                            />
                            <button
                                className={styles.createButton}
                                disabled={isNewCommentEmpty}
                                type="submit">
                                Criar
                                <PlusCircle size={20} />
                            </button>
                        </div>
                    </form>

                </div>
                <div className={styles.todoContent}>
                    <header className={styles.tasksPannelControl} >
                        <p>Tarefas criadas: <span>{taskCount}</span></p>
                        <p>Concluídas: <span>{taskIsFinished} de {taskCount}</span></p>
                    </header>
                    {/* <div className={styles.todoTasks}>
                        <img src={clipboard} alt="" />
                        Você ainda não tem tarefas cadastradas
                        <strong>
                            Crie tarefas e organize seus itens a fazer
                        </strong>
                    </div> */}
                    <div>

                        {tasks.map((task) => {
                            return (
                                <Task
                                    task={task}
                                    key={task.id}
                                    onDeleteTask={handleDeleteTask}
                                    onUpdateTask={handleTaskFinished}

                                />
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}
