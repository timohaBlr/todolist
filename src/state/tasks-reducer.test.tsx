import {v1} from "uuid";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";

let todolistId1 = v1()
let todolistId2 = v1()
let newTaskTitle = 'React!'
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

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    newTaskTitle = 'React!'
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
})
test(' task must be removed from the right toollist', () => {
    const action = RemoveTaskAC(todolistId1, '1')
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks).not.toBe(tasks)
    expect(newTasks[todolistId1].length).toBe(1)
    expect(newTasks[todolistId1][0].title).toBe(tasks[todolistId1][1].title)
})

test('new task must be added to the right toollist', () => {
    const action = AddTaskAC(todolistId1, newTaskTitle)
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks).not.toBe(tasks)
    expect(newTasks[todolistId1].length).toBe(3)
    expect(newTasks[todolistId1][1]).toBe(tasks[todolistId1][0])
})

test('right task must be renamed', ()=> {
    const action = ChangeTaskTitleAC(todolistId2, '2', newTaskTitle)
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks).not.toBe(tasks)
    expect(newTasks[todolistId2][1].title).toBe(newTaskTitle)
    expect(newTasks[todolistId2][0].title).toBe(tasks[todolistId2][0].title)
})

test('status of right tusk must be changed', ()=> {
    const action = ChangeTaskStatusAC(todolistId2, '2', tasks[todolistId2][1].isDone)
    const newTasks = tasksReducer(tasks, action)

    expect(newTasks).not.toBe(tasks)
    expect(newTasks[todolistId2][1].isDone).toBeFalsy()
    expect(newTasks[todolistId2][0].isDone).toBe(tasks[todolistId2][0].isDone)
})