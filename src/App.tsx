import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    const [title, setTitle] = useState<string>('')

    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])

    }
    const buttonRemoveOnClickHandler = (id: string) => {
        setTasks(tasks.filter(tasks => tasks.id !== id))
    }
    const buttonFilterOnClickHandler = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const filteredTasks = filter === 'active' ?
        tasks.filter(tasks => !tasks.isDone) : filter === 'completed' ?
            tasks.filter(tasks => tasks.isDone) : tasks

    return (
        <div className={'App'}>
            <Todolist
                buttonRemoveOnClickHandler={buttonRemoveOnClickHandler}
                listTitle={'What to learn'}
                tasks={filteredTasks}
                buttonFilterOnClickHandler={buttonFilterOnClickHandler}
                addTask={addTask}
                title={title}
                setTitle={setTitle}/>
        </div>
    );
}

export default App;
