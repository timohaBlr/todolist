import React, {useCallback} from 'react'
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
import {addTodoListTC} from '../state/todolists-reducer'
import {useAppDispatch, useAppSelector} from '../state/store';
import {TodoListsList} from "../Todolists/TodoListsList";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TaskDomainType} from "../state/tasks-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)


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
                {status === 'loading'
                    ? <LinearProgress/>
                    : <div className={'loader'}/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <TodoListsList/>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

