import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AddTaskAC, ChangeTasksStatusAC, ChangeTasksTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(todolistId: string, id: string) {
        setTasks(tasksReducer(tasks, RemoveTaskAC(todolistId, id)))
    }

    function addTask(todolistId: string, title: string) {
        setTasks(tasksReducer(tasks, AddTaskAC(todolistId, title)))
    }

    function changeStatus(id: string, todolistId: string, isDone: boolean) {
        setTasks(tasksReducer(tasks, ChangeTasksStatusAC(todolistId, id, isDone)))
    }

    function changeTaskTitle(todolistId: string, id: string, newTitle: string) {
        setTasks(tasksReducer(tasks, ChangeTasksTitleAC(todolistId, id, newTitle)))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolistsReducer(todolists, ChangeTodolistFilterAC(todolistId, value)))
    }

    function removeTodolist(id: string) {
        setTodolists(todolistsReducer(todolists, RemoveTodolistAC(id)))
        setTasks(tasksReducer(tasks, RemoveTodolistAC(id)))
    }

    function changeTodolistTitle(id: string, title: string) {
        setTodolists(todolistsReducer(todolists, ChangeTodolistTitleAC(id, title)))
    }

    function addTodolist(title: string) {
        setTodolists(todolistsReducer(todolists, AddTodolistAC(title)))
        setTasks(tasksReducer(tasks, AddTodolistAC(title)))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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
            </Container>
        </div>
    );
}

export default App;
