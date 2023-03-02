import React, {useCallback} from "react";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../state/store";
import {useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    FilterValuesType,
    removeTodoListTC,
    renameTodoListTC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "../state/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../App/App";

type TodoListsListPropsType = {}
export const TodoListsList: React.FC<TodoListsListPropsType> = (props) => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(changeTaskStatusTC(todolistId, id, status));
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleTC(todolistId, id, newTitle));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodoListTC(id));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(renameTodoListTC(id, title));
    }, []);
    return <>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}