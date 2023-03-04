import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../state/store';
import {TodoListsList} from "../Todolists/TodoListsList";
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TaskDomainType} from "../state/tasks-reducer";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import {Login} from "../features/Login/Login";


export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)
    const navigate = useNavigate()

    const toLoginClick = () => {
        navigate('/login')
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
                    <Button color="inherit" onClick={toLoginClick}>Login</Button>
                </Toolbar>
                {status === 'loading'
                    ? <LinearProgress/>
                    : <div className={'loader'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

