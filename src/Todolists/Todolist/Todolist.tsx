import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Delete} from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import {Task} from './Task/Task'
import {TaskStatuses} from '../../api/todolists-api'
import {FilterValuesType, TodolistDomainType} from '../../state/todolists-reducer'
import {useAppDispatch} from "../../state/store";
import {fetchTasksTC, TaskDomainType} from "../../state/tasks-reducer";
import style from './Todolist.module.css'

type PropsType = {
    tl: TodolistDomainType
    tasks: Array<TaskDomainType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    // filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {
    const {title, order, id, filter, entityStatus} = props.tl
    // console.log('Todolist called')
    const dispatch = useAppDispatch();

    const todoListDisabled = entityStatus === 'loading'

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, id)
    }, [props.addTask, id])

    const removeTodolist = () => {
        props.removeTodolist(id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(id, title)
    }, [id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', id), [id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', id), [id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', id), [id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    const todolistClass = todoListDisabled
        ? style.todoList + ' ' + style.loading
        : style.todoList

    return <div className={todolistClass}>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle} disabled={todoListDisabled}/>
            <IconButton onClick={removeTodolist} disabled={todoListDisabled}>
                <Delete/>
            </IconButton>
            {order}
        </h3>
        <AddItemForm addItem={addTask} disabled={todoListDisabled}/>
        <div>
            {

                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={id}
                                                todoListDisabled={todoListDisabled}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
        {todoListDisabled && <CircularProgress className={style.loader}/>}
    </div>
})


