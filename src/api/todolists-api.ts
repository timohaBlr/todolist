import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f1b329ae-33ec-433c-a569-17e2b54270db'
    }
})

// api
export const todolistsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTuskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
    reorderTodoList(todoListId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}/reorder`, {putAfterItemId})
    },
    reorderTask(todoListId: string, taskId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}/reorder`, {putAfterItemId})
    }
}

// types
export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
type UpdateTuskModelType = {
    title: string
    startDate: string
    priority: number
    description: string
    deadline: string
    status: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

