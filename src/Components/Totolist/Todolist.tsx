import React, {ChangeEvent, KeyboardEvent} from "react";

import {SuperInput} from "../SuperInput/SuperInput";
import {SuperButton} from "../SuperInput/SuperButton";
import s from './Todolist.module.css'

/*

type TodolistPropsType = {
    tasks: Array<TaskType>
    buttonRemoveOnClickHandler: (id: string, todolistID: string) => void
    buttonFilterOnClickHandler: (filter: FilterValueType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    title: string
    setTitle: (title: string) => void
    checkBoxOnChangeHandler: (id: string, isDone: boolean, todolistID: string) => void
    error: null | string
    setError: (error: string | null) => void
    filter: FilterValueType
    id: string
    inputTitle: string
    removeTodolist: (todolistID: string) => void
}


export function Todolist(props: TodolistPropsType) {
    const buttonAddCallBack = () => {
        if (props.inputTitle.trim() !== '') {
            props.addTask(props.inputTitle.trim(), props.id)
        } else {
            props.setError('Field is required!')
        }
        props.setTitle('')
    }
    const inputOnChangeCallBack = (title: string) => {
        props.setTitle(title)
        props.setError(null)
    }
    const onKeyPressCallBack = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (props.inputTitle.trim() !== '') {
                props.addTask(props.inputTitle.trim(), props.id)
            } else {
                props.setError('Field is required!')
            }
            props.setTitle('')
        }
    }
    const buttonOnClickAllHandler = () => {
        props.buttonFilterOnClickHandler('all', props.id)
    }
    const buttonOnClickActiveHandler = () => {
        props.buttonFilterOnClickHandler('active', props.id)
    }
    const buttonOnClickCompletedHandler = () => {
        props.buttonFilterOnClickHandler('completed', props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const inputStyle = props.error ? s.input_error : s.input
    return (
        <div>
            <div>
                <h3>{props.title}<SuperButton title={'Remove list'} callBack={removeTodolistHandler}/></h3>
                <div>
                    <div className={inputStyle}><SuperInput title={props.inputTitle}
                                                            onChangeCallBack={inputOnChangeCallBack}
                                                            onKeyPressCallBack={onKeyPressCallBack}/></div>
                    <div><SuperButton title={'+'} callBack={buttonAddCallBack}/></div>
                    {props.error && <div className={s.error}>{props.error}</div>}
                </div>
                <ul>
                    {props.tasks.map((m) => {
                            const buttonOnClickRemoveHandler = () => {
                                props.buttonRemoveOnClickHandler(m.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.checkBoxOnChangeHandler(m.id, e.currentTarget.checked, props.id)
                            }
                            return (
                                <li className={m.isDone ? s.done : ''} key={m.id}>
                                    <input type="checkbox"
                                           onChange={onChangeHandler}
                                           checked={m.isDone}/>
                                    <span>{m.title}</span>
                                    <button onClick={buttonOnClickRemoveHandler}>✖</button>
                                </li>)
                        }
                    )}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? s.filter_active : s.filter}
                            onClick={buttonOnClickAllHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? s.filter_active : s.filter}
                            onClick={buttonOnClickActiveHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? s.filter_active : s.filter}
                            onClick={buttonOnClickCompletedHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}*/
