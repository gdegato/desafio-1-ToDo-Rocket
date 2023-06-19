import styles from './Task.module.css'
import { Trash } from '@phosphor-icons/react'
import { useState, ChangeEvent } from 'react'

export interface TaskType {
    content: string;
    id: number;
    checked?: boolean;
}

interface TaskProps {
    task: TaskType;
    onDeleteTask: (taskId: number) => void;
    onUpdateTask: (checked: true) => void;
}

export function Task({ task, onDeleteTask, onUpdateTask }: TaskProps) {

    function deleteButtonTrashClick() {
        onDeleteTask(task.id)
    }
    function taskIsFinnalyFinished() {
        onUpdateTask(true)
        console.log('taskIsFinnalyFinished aqui gente')
    }

    const checkedOnChange = function handleTaskChecked() { // contador de tarefas concluidas
       /*  const checked = e.target.value
        !checked ? setTaskChecked(false) : setTaskChecked(true) */
        task.checked = true
    }

    return (
        <div className={styles.taskContainer}>
            <label className={styles.checkboxContainer}>
                <input
                    title="Assinalar como concluída a tarefa"
                    type="checkbox"
                    onChange={checkedOnChange}
                    onClick={taskIsFinnalyFinished}
                    /*   value={handleTaskChecked} */
                    checked={task.checked}
                />
                <span className={styles.checkmark}></span>
            </label>

            <p>{task.content}</p>
            <button
                title="Deletar tarefa"
                onClick={deleteButtonTrashClick}
            >
                <Trash
                    size={24}
                />
            </button>
        </div>
    )
}
