import {AddTodolistAC, RemoveTodolistAC, todolistsReducer, TodolistType} from "./todolists-reducer";
import {v1} from "uuid";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

let todolistId1 = v1()
let todolistId2 = v1()
let tasks: TasksStateType = {
    [todolistId1]: [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: '1', title: "Milk", isDone: true},
        {id: '2', title: "React Book", isDone: true}
    ]
}
let startState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]
beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    tasks = {
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('todolist must be removed with his tasks', () => {
    const action = RemoveTodolistAC(todolistId1)
    const newTasks = tasksReducer(tasks, action)
    const newTodolists = todolistsReducer(startState, action)
    let keys = Object.keys(tasks)
    let newKeys = Object.keys(newTasks)

    expect(newKeys.find(f => f === todolistId1)).toBeUndefined()
    expect(keys.length).not.toBe(newKeys.length)
    expect(newKeys.length).toBe(1)
    expect(newTasks[todolistId1]).not.toBeDefined()
    expect(newTodolists[0]).not.toBe(startState[0])
})

test('new todolist must have his own new tasks', () => {
    const newTodolistTitle = 'New list'
    const action = AddTodolistAC(newTodolistTitle)
    const newTasks = tasksReducer(tasks, action)
    const newTodolists = todolistsReducer(startState, action)
    let keys = Object.keys(tasks)
    let newKeys = Object.keys(newTasks)

    expect(newKeys.find(f => (f !== todolistId1)&& (f!==todolistId2))).toBeDefined()
    expect(newKeys.includes(newTodolists[0].id)).toBeTruthy()
    expect(keys.length).not.toBe(newKeys.length)
    expect(newKeys.length).toBe(3)
    expect(newTodolists[0]).not.toBe(startState[0])
})