import React, {useCallback, useMemo} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AddTodolistAC, TodolistType} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Todolist} from "./Todolist";


const App = React.memo(() => {
    console.log('App is called')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)


    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [])

    const mappedTodoList = useMemo(() => todolists.map(todolist => {
        return (<Paper style={{padding: "10px"}} key={todolist.id}>
            <Todolist todolist={todolist}/>
        </Paper>)
    }), [todolists])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        New
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm source={'app'} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoList}
                </Grid>
            </Container>
        </div>
    );
})

export default App;
