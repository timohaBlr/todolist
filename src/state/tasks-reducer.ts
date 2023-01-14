import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

type ActionsType =
    RemoveTaskActionType | AddTodolistActionType
    | AddTaskActionType | ChangeTaskStatusActionType | RemoveTodolistActionType | ChangeTaskTitleActionType

type AddTaskActionType = ReturnType<typeof AddTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: false}
    ]
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: action.payload.taskId,
                    title: action.payload.newTaskTitle,
                    isDone: false
                },
                    ...state[action.payload.todolistId]]
            };
        case 'RENAME-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId
                    ? {...m, title: action.payload.newTaskTitle} : m)
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId
                    ? {...m, isDone: action.payload.isDone} : m)
            };
        case 'REMOVE-TODOLIST':
            let {[action.payload.todolistId]: [], ...rest} = {...state}
            return rest;
        case 'ADD-TODOLIST':
            return {[action.payload.todolistId]: [], ...state}
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
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskId,
            isDone,
        },
    } as const
}
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'RENAME-TASK',
        payload: {
            todolistId,
            taskId,
            newTaskTitle,
        },
    } as const
}
