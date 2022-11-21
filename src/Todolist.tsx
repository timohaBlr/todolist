import React, {KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import {SuperButton} from "./Components/SuperInput/SuperButton";



type TodolistPropsType = {
    listTitle: string
    tasks: Array<TaskType>
    buttonRemoveOnClickHandler: (id: string) => void
    buttonFilterOnClickHandler: (filter: FilterValueType) => void
    addTask: (title: string) => void
    title: string
    setTitle: (title: string) => void
}


export function Todolist(props: TodolistPropsType) {
    const buttonAddCallBack = () => {
        props.addTask(props.title)
        props.setTitle('')
    }
    const inputOnChangeCallBack = (title: string) => {
        props.setTitle(title)
    }
    const onKeyPressCallBack = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(props.title)
            props.setTitle('')
        }
    }
    const buttonOnClickAllHandler = () => {
        props.buttonFilterOnClickHandler('all')
    }
    const buttonOnClickActiveHandler = () => {
        props.buttonFilterOnClickHandler('active')
    }
    const buttonOnClickCompletedHandler = () => {
        props.buttonFilterOnClickHandler('completed')
    }
    return (
        <div>
            <div>
                <h3>{props.listTitle}</h3>
                <div>
                    <div><SuperInput title={props.title}
                                     onChangeCallBack={inputOnChangeCallBack}
                                     onKeyPressCallBack={onKeyPressCallBack}/></div>
                    <div><SuperButton title={'+'} callBack={buttonAddCallBack}/></div>
                </div>
                <ul>
                    {props.tasks.map((m) => {
                            const buttonOnClickRemoveHandler = () => {
                                props.buttonRemoveOnClickHandler(m.id)
                            }
                            return (
                                <li key={m.id}>
                                    <input type="checkbox"
                                           checked={m.isDone}/>
                                    <span>{m.title}</span>
                                    <button onClick={buttonOnClickRemoveHandler}>✖</button>
                                </li>)
                        }
                    )}
                </ul>
                <div>
                    <button onClick={buttonOnClickAllHandler}>All</button>
                    <button onClick={buttonOnClickActiveHandler}>Active</button>
                    <button onClick={buttonOnClickCompletedHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}