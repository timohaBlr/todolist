import {TasksStateType} from "../App";
import {v1} from "uuid";


const cases = {
    removeTodolistTasks: 'REMOVE-TODOLIST-TASKS',
    addNewTask: 'ADD-NEW-TASK',
    removeTask: 'REMOVE-TASK',
    changeTaskTitle: 'CHANGE-TASK-TITLE',
    changeStatus: 'CHANGE-TASK-STATUS',
    newTasksNewTodolist: 'TASKS-NEW-TODOLIST',
}

export const tasksReducer = (state: TasksStateType, action: TsarType) => {
    const todolistId = action.payload.todolistId
    switch (action.type) {
        case 'REMOVE-TODOLIST-TASKS' :
            const stateCopy = {...state} //можно ли красивей?
            delete stateCopy[todolistId]
            return stateCopy;
        case 'ADD-NEW-TASK' :
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state, [todolistId]: [newTask, ...state[todolistId]]
            };
        case 'REMOVE-TASK':
            const notRemovedTasks = state[todolistId].filter(task => task.id !== action.payload.id);
            return {...state, [todolistId]: notRemovedTasks};
        case 'CHANGE-TASK-TITLE':
            const renamedTasks = state[todolistId].map(task => task.id !== action.payload.id
                ? task
                : {...task, title: action.payload.newTitle})
            return {...state, [todolistId]: renamedTasks};
        case 'CHANGE-TASK-STATUS':
            const changedTasks = state[todolistId].map(task => task.id !== action.payload.id
                ? task
                : {...task, isDone: action.payload.isDone})
            return {...state, [todolistId]: changedTasks};
        case 'TASKS-NEW-TODOLIST':
            return {...state, [todolistId]: []};
        default:
            return state;
    }
}
type TsarType =
    RemoveTodolistTasksACType
    | AddTasksAddTodolistACType
    | RemoveTaskACType
    | ChangeTaskTitleACType
    | ChangeStatusACACType | NewTasksNewTodolistAC
type RemoveTodolistTasksACType = ReturnType<typeof removeTodolistTasksAC>
type AddTasksAddTodolistACType = ReturnType<typeof addNewTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type ChangeStatusACACType = ReturnType<typeof changeStatusAC>
type NewTasksNewTodolistAC = ReturnType<typeof newTasksNewTodolistAC>

export const removeTodolistTasksAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST-TASKS',
        payload: {todolistId},
    } as const
}
export const addNewTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-NEW-TASK',
        payload: {
            title: title,
            todolistId: todolistId,
        }
    } as const
}
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todolistId: todolistId
        }
    } as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id: id,
            newTitle: newTitle,
            todolistId: todolistId
        }
    } as const
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id: id,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}
export const newTasksNewTodolistAC = (todolistId: string) => {
    return {
        type: 'TASKS-NEW-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
