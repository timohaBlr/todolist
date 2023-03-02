import React, {useCallback, useEffect} from 'react'
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Menu} from '@mui/icons-material';
import {addTodoListTC, fetchTodoListsTC} from '../state/todolists-reducer'
import {useAppDispatch} from '../state/store';
import {TaskType} from '../api/todolists-api'
import {TodoListsList} from "../Todolists/TodoListsList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);

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
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <TodoListsList/>
            </Container>
        </div>
    );
}

export default App;

