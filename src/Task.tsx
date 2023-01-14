import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TaskType} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todoListId, ...restProps}) => {
    console.log('Task:', task.title)
    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        dispatch(RemoveTaskAC(todoListId, task.id))
    }, [todoListId, task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeTaskStatusAC(todoListId, task.id, newIsDoneValue))
    }, [todoListId, task.id])

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, task.id, newTitle))
    }, [todoListId, task.id])

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})