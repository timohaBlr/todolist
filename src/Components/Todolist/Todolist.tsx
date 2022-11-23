import React, {ChangeEvent, useState} from 'react';
import {InputCustom} from "../InputCustom/InputCustom";
import {ButtonCustom} from "../ButtonCustom/ButtonCustom";
import {ErrorType, FilterValueType, TaskType} from "./TodolistContainer";
import s from './Todolist.module.css'



type TodolistPropsType = {
    tasks: Array<TaskType>
    deleteTaskCallBack: (id: string) => void
    filterTaskCallBack: (filter: string) => void
    addTaskCallBack: (title: string) => void
    error: ErrorType
    setError: (error: ErrorType) => void
    checkBoxOnChangeHandler: (isDone: boolean, id: string) => void
    filter: FilterValueType
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const buttonFilterOnClickHandler = (title: string) => {
        props.filterTaskCallBack(title.toLowerCase() as FilterValueType)
    }
    const inputOnChangeHandler = (value: string) => {
        props.setError(null)
        setTitle(value)
    }
    const inputOnKeyPressHandler = () => {

        props.addTaskCallBack(title.trim())
        setTitle('')
    }
    const buttonAddOnClickCallBack = () => {
        props.addTaskCallBack(title.trim())
        setTitle('')
    }

    return (
        <div>
            <h1>What to learn?</h1>
            <div>
                <div className={props.error ? s.inputError : s.input}>
                    <InputCustom value={title}
                                 onChangeText={inputOnChangeHandler}
                                 onEnter={inputOnKeyPressHandler}/>
                </div>
                <div className={s.buttonAdd}>
                    <button onClick={buttonAddOnClickCallBack}>Add</button>
                </div>
                <div className={s.error}>{props.error}</div>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const checkBoxOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.checkBoxOnChangeHandler(event.currentTarget.checked, task.id)
                    }
                    const buttonDeleteTaskHandler = () => {
                        props.deleteTaskCallBack(task.id)
                    }
                    return <li key={task.id} className={task.isDone ? s.task : ''}>
                        <input type={"checkbox"}
                               onChange={checkBoxOnChangeHandler}
                               checked={task.isDone}/>
                        {task.title}
                        <button onClick={buttonDeleteTaskHandler}>X</button>
                    </li>
                })}
            </ul>
            <div>
                <div className={props.filter === 'all' ? s.filterButtonActive : s.filterButton}><ButtonCustom
                    callBackTitled={buttonFilterOnClickHandler} title={'All'}/></div>
                <div className={props.filter === 'active' ? s.filterButtonActive : s.filterButton}><ButtonCustom
                    callBackTitled={buttonFilterOnClickHandler} title={'Active'}/></div>
                <div className={props.filter === 'completed' ? s.filterButtonActive : s.filterButton}><ButtonCustom
                    callBackTitled={buttonFilterOnClickHandler} title={'Completed'}/></div>
            </div>
        </div>
    );
};
