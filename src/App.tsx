import React from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodolistContainer} from "./state/TodolistContainer";
import {TodolistType} from "./state/todolists-reducer";


type AppPropsType = {
    todolists: TodolistType[]
    addTodolist: (title: string) => void
}

function App(props: AppPropsType) {

    function addTodolist(title: string) {
        props.addTodolist(title)
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
                    {props.todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper style={{padding: "10px"}}>
                                <TodolistContainer
                                    key={tl.id}
                                    id={tl.id}
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
