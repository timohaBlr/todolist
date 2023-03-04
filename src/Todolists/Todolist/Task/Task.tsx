import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../../../api/todolists-api'
import {TaskDomainType} from "../../../state/tasks-reducer";

type TaskPropsType = {
    task: TaskDomainType
    todolistId: string
    todoListDisabled: boolean
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             task,
                                                             todolistId,
                                                             removeTask,
                                                             changeTaskStatus,
                                                             changeTaskTitle,
                                                             todoListDisabled
                                                         }) => {

    const taskDisabled = todoListDisabled || task.entityStatus === 'loading'

    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [task.id, todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId)
    }, [task.id, todolistId]);

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={taskDisabled}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} disabled={taskDisabled}/>
        <IconButton onClick={onClickHandler} disabled={taskDisabled}>
            <Delete/>
        </IconButton>
        {task.order}
    </div>
})
