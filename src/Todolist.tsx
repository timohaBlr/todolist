import React, { useCallback, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    TodolistType
} from "./state/todolists-reducer";
import {
    AddTaskAC,
      TaskType
} from "./state/tasks-reducer";
import { useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Task} from "./Task";


type TodoListPropsType = {
    todolist: TodolistType
}

export const Todolist: React.FC<TodoListPropsType> = React.memo(({todolist, ...restProps}) => {
    const {id: todoListId, title: todoListTitle, filter} = todolist
    console.log('Todolist from:', todoListTitle)
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[todoListId])

const tasksForTodolist = useMemo(()=> {
    if (filter === "active") {
       return  tasks.filter(t => !t.isDone);
    } else   if (filter === "completed") {
        return  tasks.filter(t => t.isDone);
    } else return tasks
}, [tasks]) // не сказывается на производительности
   /* let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }*/


    const addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }, [todoListId])

    const removeTodolist = useCallback(() => {
        dispatch(RemoveTodolistAC(todoListId))
    }, [todoListId])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, newTitle))
    }, [todoListId])

    const onAllClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(todoListId, "all")),
        [todoListId])
    const onActiveClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(todoListId, "active")),
        [todoListId])
    const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(todoListId, "completed")),
        [todoListId])

    const mappedTasks = useMemo(() => tasksForTodolist.map(task => {
        return <Task task={task} todoListId={todoListId} key={task.id}/>
    }), [tasksForTodolist])  // мемоизация не сказывается на производительности

    return <div>
        <h3><EditableSpan value={todoListTitle} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm source={todoListTitle} addItem={addTask}/>
        <div>
            {mappedTasks}
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>
                Completed
            </Button>
        </div>
    </div>
})



