import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType =
    RemoveTaskActionType | AddTodolistActionType
    | AddTaskActionType | ChangeTasksStatusActionType | RemoveTodolistActionType | ChangeTasksTitleActionType

type AddTaskActionType = ReturnType<typeof AddTaskAC>
type ChangeTasksStatusActionType = ReturnType<typeof ChangeTasksStatusAC>
type ChangeTasksTitleActionType = ReturnType<typeof ChangeTasksTitleAC>
type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    const todolistId = action.payload.todolistId
    //const taskId = action.payload.taskId
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [todolistId]: state[todolistId].filter(f => f.id !== action.payload.taskId)};
        case 'ADD-TASK':
            return {
                ...state,
                [todolistId]: [{id: action.payload.taskId, title: action.payload.newTaskTitle, isDone: false},
                    ...state[todolistId]]
            };
        case 'RENAME-TASK':
            return {
                ...state,
                [todolistId]: state[todolistId].map(m => m.id === action.payload.taskId
                    ? {...m, title: action.payload.newTaskTitle} : m)
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [todolistId]: state[todolistId].map(m => m.id === action.payload.taskId
                    ? {...m, isDone: action.payload.isDone} : m)
            };
        case 'REMOVE-TODOLIST':
            let {[todolistId]: [], ...rest} = {...state}
            return rest;
        case 'ADD-TODOLIST':
            return {[todolistId]: [], ...state}
        default:
            return state;
    }
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId,
        },
    } as const
}
export const AddTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            newTaskTitle,
            taskId: v1(),
        },
    } as const
}
export const ChangeTasksStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskId,
            isDone,
        },
    } as const
}
export const ChangeTasksTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'RENAME-TASK',
        payload: {
            todolistId,
            taskId,
            newTaskTitle,
        },
    } as const
}
