import { useState } from 'react';
import styles from './Task.module.css'
import { Trash } from '@phosphor-icons/react'

export interface TaskType {
    content: string;
    id: string;
    checked?: boolean;
}

interface TaskProps {
    task: TaskType;
    onDeleteTask: (taskId: string) => void;
    onUpdateTask: (taskId: string, checked: boolean) => void;
}

export function Task({ task, onDeleteTask, onUpdateTask }: TaskProps) {

    const [taskChecked, setTaskChecked] = useState(false)

    function deleteButtonTrashClick() {
        onDeleteTask(task.id)
    }

    const checkedOnChange = function handleTaskChecked() { // contador de tarefas concluidas
        setTaskChecked(true)
        onUpdateTask(task.id, true)
    }

    return (
        <div className={styles.taskContainer}>
            <label className={styles.checkboxContainer}>
                <input
                    title="Assinalar como concluída a tarefa"
                    type="checkbox"
                    onChange={checkedOnChange}
                    checked={taskChecked}
                    
                />
                <span className={styles.checkmark}></span>
            </label>

            <p
            className={taskChecked ? styles.lineThrough : styles.normalLine}>{task.content}</p>
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
