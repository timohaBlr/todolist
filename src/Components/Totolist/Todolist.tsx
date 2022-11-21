import React, {ChangeEvent, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "../../App";
import {SuperInput} from "../SuperInput/SuperInput";
import {SuperButton} from "../SuperInput/SuperButton";
import s from './Todolist.module.css'


type TodolistPropsType = {
    listTitle: string
    tasks: Array<TaskType>
    buttonRemoveOnClickHandler: (id: string) => void
    buttonFilterOnClickHandler: (filter: FilterValueType) => void
    addTask: (title: string) => void
    title: string
    setTitle: (title: string) => void
    checkBoxOnChangeHandler: (id: string, isDone: boolean) => void
    error: null | string
    setError: (error: string | null) => void
    filter: FilterValueType
}


export function Todolist(props: TodolistPropsType) {
    const buttonAddCallBack = () => {
        if (props.title.trim() !== '') {
            props.addTask(props.title.trim())
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
            if (props.title.trim() !== '') {
                props.addTask(props.title.trim())
            } else {
                props.setError('Field is required!')
            }
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
    const inputStyle = props.error ? s.input_error : s.input
    return (
        <div>
            <div>
                <h3>{props.listTitle}</h3>
                <div>
                    <div className={inputStyle}><SuperInput title={props.title}
                                                         onChangeCallBack={inputOnChangeCallBack}
                                                         onKeyPressCallBack={onKeyPressCallBack}/></div>
                    <div><SuperButton title={'+'} callBack={buttonAddCallBack}/></div>
                    {props.error && <div className={s.error}>{props.error}</div>}
                </div>
                <ul>
                    {props.tasks.map((m) => {
                            const buttonOnClickRemoveHandler = () => {
                                props.buttonRemoveOnClickHandler(m.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.checkBoxOnChangeHandler(m.id, e.currentTarget.checked)
                            }
                            return (
                                <li className={m.isDone? s.done : ''} key={m.id}>
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
                    <button className={props.filter === 'all'? s.filter_active: s.filter}
                            onClick={buttonOnClickAllHandler}>All</button>
                    <button className={props.filter === 'active'? s.filter_active: s.filter} onClick={buttonOnClickActiveHandler}>Active</button>
                    <button className={props.filter === 'completed'? s.filter_active: s.filter} onClick={buttonOnClickCompletedHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}