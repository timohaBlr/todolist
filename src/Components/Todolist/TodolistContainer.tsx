import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistContainerPropsType = {}
export type FilterValueType = 'all' | 'active' | 'completed'
export type ErrorType = string | null

export const TodolistContainer: React.FC<TodolistContainerPropsType> = (props) => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Graph QL", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
        ]
    )
    const [filter, setFilter] = useState<FilterValueType>('all')
    const [error, setError] = useState<ErrorType>(null)

    const deleteTaskCallBack = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const addTaskCallBack = (title: string) => {
        if (title.trim() === '') {
            setError('Field is required!')
            return;
        }
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
        setError(null)
    }
    const checkBoxOnChangeCallBack = (isDone: boolean, id: string) => {
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    const filterTaskCallBack = (filter: string) => {
        setFilter(filter as FilterValueType)
    }
    const filteredTasks = filter === 'active' ? tasks.filter(task => !task.isDone) : filter === 'completed'
        ? tasks.filter(task => task.isDone) : tasks

    return (
        <div>
            <Todolist tasks={filteredTasks}
                      deleteTaskCallBack={deleteTaskCallBack}
                      filterTaskCallBack={filterTaskCallBack}
                      addTaskCallBack={addTaskCallBack}
                      error={error}
                      checkBoxOnChangeHandler={checkBoxOnChangeCallBack}
                      filter={filter}
                      setError={setError}/>
        </div>
    );
};

