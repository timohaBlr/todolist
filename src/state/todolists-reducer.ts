import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type ActionsType =
    RemoveTodolistActionType
    | ChangeTodolistTitleACActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
type ChangeTodolistTitleACActionType = ReturnType<typeof ChangeTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    const todolistId = action.payload.todolistId
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(f=> f.id !== todolistId);
        case 'ADD-TODOLIST':
            return [{id: todolistId, title: action.payload.title, filter: 'all'},...state];
        case 'RENAME-TODOLIST':
            return state.map(m=> m.id === todolistId
                ? {...m, title: action.payload.title}
            : m);
        case 'FILTER-TODOLIST':
            return state.map(m=> m.id === todolistId
                ? {...m, filter: action.payload.filter}
            : m);
        default:
            return state;
    }
}
export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId,
        },
    } as const
}
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(),
            title,
        },
    } as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'RENAME-TODOLIST',
        payload: {
            todolistId,
            title,
        },
    } as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'FILTER-TODOLIST',
        payload: {
            todolistId,
            filter,
        },
    } as const
}
