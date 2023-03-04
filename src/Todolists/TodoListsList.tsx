import React, {useCallback, useEffect} from "react";
import { useAppDispatch, useAppSelector} from "../state/store";
import {
    changeTodolistFilterAC, fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC,
    renameTodoListTC,
} from "../state/todolists-reducer";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "../state/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";

type TodoListsListPropsType = {}
export const TodoListsList: React.FC<TodoListsListPropsType> = ({}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(changeTaskStatusTC(todolistId, id, status));
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleTC(todolistId, id, newTitle));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodoListTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(renameTodoListTC(id, title));
    }, [dispatch]);
    return <>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                tl={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                // filter={tl.filter}
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