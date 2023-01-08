import {connect} from "react-redux";
import {AppRootState} from "./store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./tasks-reducer";
import {Dispatch} from "redux";
import {Todolist} from "../Todolist";
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    FilterValuesType,
    RemoveTodolistAC,
    TodolistType
} from "./todolists-reducer";


type mapStateToPropsType = {
    todolists: TodolistType[]
    //tasks: Array<TaskType>
}
type mapDispatchToPropsType = {
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
}
const mapStateToProps = (state: AppRootState): mapStateToPropsType => {
    return {
        todolists: state.todolists,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        removeTask: (todolistId: string, id: string) => {
            dispatch(RemoveTaskAC(todolistId, id))
        },
        addTask: (todolistId: string, title: string) => {
            dispatch(AddTaskAC(todolistId, title))
        },
        changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => {
            dispatch(ChangeTaskStatusAC(todolistId, id, isDone))
        },
        removeTodolist: (todolistId: string) => {
            dispatch(RemoveTodolistAC(todolistId))
        },
        changeTodolistTitle: (todolistId: string, newTitle: string) => {
            dispatch(ChangeTodolistTitleAC(todolistId, newTitle))
        },
        changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => {
            dispatch(ChangeTaskTitleAC(todolistId, taskId, newTitle))
        },
        changeFilter: (todolistId: string, filter: FilterValuesType) =>{
            dispatch(ChangeTodolistFilterAC(todolistId,filter))
        },
    }
}

export const TodolistContainer = connect(mapStateToProps, mapDispatchToProps)(Todolist)