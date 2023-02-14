import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state;
    }
}

// actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId}) as const
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
}) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const

// thunk creators
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            }
        })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        })
}
export const renameTodoListTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
            }
        })
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}