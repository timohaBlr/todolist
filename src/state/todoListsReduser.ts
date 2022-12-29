import {FilterValuesType, TodolistType} from "../App";

export const todoListsReducer = (state: TodolistType[], action: TsarType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(todolist => todolist.id !== action.payload.id)];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist => todolist.id === action.payload.id
                ? {...todolist, title: action.payload.title}
                : todolist);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist => todolist.id === action.payload.todolistId
                ? {...todolist, filter: action.payload.filter}
                : todolist);
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: "all" as FilterValuesType
            }];
        // обратить внимание на as
        default:
            return state;
    }
}
type TsarType = RemoveTodolistACType | changeTodolistTitleACType | changeFilterACType | addTodolistACType
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id},
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title,
        },
    } as const
}
export const changeFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter: filter,
            todolistId: todolistId,
        },
    } as const
}
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            newTodolistId: newTodolistId
        },
    } as const
}
