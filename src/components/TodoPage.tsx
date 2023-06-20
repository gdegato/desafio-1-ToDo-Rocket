import styles from './TodoPage.module.css'
import { PlusCircle } from '@phosphor-icons/react'
import { Task, TaskType } from './Task'
import { useState, FormEvent, ChangeEvent } from 'react'
import clipboard from '../assets/images/clipboard.svg'
import { v4 as uuidv4 } from 'uuid';


export function TodoPage() {

    const [tasks, setTasks] = useState<TaskType[]>([]); //criar uma lista de tarefas
    const [newTask, setNewTask] = useState(''); //criar uma nova tarefa
    const [taskCount, setTaskCount] = useState(0); //contar as tarefas criadas
    const [taskFinished, setTaskFinished] = useState(0); //contar as tarefas concluídas

    function handleSubmit(e: FormEvent) { //enviar a nova tarefa no submit do formulario
        e.preventDefault();
        const newTaskText: TaskType = { //passando as propriedades obrigatorias ao criar uma nova tarefa
            content: newTask,
            id: uuidv4(),
            checked: false,
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
    
  /*
    function handleDeleteTask(taskIdToDelete: string) { // deletar tarefas
        const tasksWithoutDeletedOne = tasks.filter((task) => {
            return task.id !== taskIdToDelete
        })
        const itemSelecionado = tasks.filter((task) => {
            return task.id !== taskIdToDelete
        })
        if (itemSelecionado[0].checked) {
            alert("Não é possivel deletar tarefa finalizada!")
        } else {
            setTasks(tasksWithoutDeletedOne)
            setTaskCount(tasksWithoutDeletedOne.length)
        }
    }
*/
       function handleDeleteTask(taskIdToDelete: string) { // deletar tarefas
            const tasksWithoutDeletedOne = tasks.filter((task) => {
                return task.id !== taskIdToDelete
            })
            setTasks(tasksWithoutDeletedOne)
            setTaskCount(tasksWithoutDeletedOne.length)
        } 

    function handleTaskFinished(taskId: string, checked: boolean) { // contador de tarefas concluidas

        const newList = tasks.map((task) => {
            if (task.id === taskId) {
                task.checked = checked
            }
            return task
        })

        setTasks(newList)
        const checkedTask = tasks.filter((task) => {
            return task.checked === true
        })
        setTaskFinished(checkedTask.length)
    }

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
                        <p>Concluídas: <span>{taskFinished} de {taskCount}</span></p>
                    </header>
                    {!taskCount && (<div className={styles.todoTasks}>
                        <img src={clipboard} alt="" />
                        Você ainda não tem tarefas cadastradas
                        <strong>
                            Crie tarefas e organize seus itens a fazer
                        </strong>
                    </div>)}

                    <div>
                        {
                            tasks.map((task) => {
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

/* 
{
    !tasks ?
        (
            <div className={styles.todoTasks}>
                <img src={clipboard} alt="" />
                Você ainda não tem tarefas cadastradas
                <strong>
                    Crie tarefas e organize seus itens a fazer
                </strong>
            </div>
        )
        :
        (
            <div>
                {
                    tasks.map((task) => {
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
        )

} */