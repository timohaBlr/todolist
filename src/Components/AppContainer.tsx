import {connect} from "react-redux";
import {AppRootState} from "../state/store";
import {Dispatch} from "redux";
import {AddTodolistAC, TodolistType} from "../state/todolists-reducer";
import {TasksStateType} from "../state/tasks-reducer";
import App from "../App";


type mapStateToPropsType = {
    todolists: TodolistType[]
    tasks: TasksStateType
}
type mapDispatchToPropsType = {
    addTodolist:(title: string) => void
}
const mapStateToProps = (state: AppRootState): mapStateToPropsType => {
    return {
        todolists: state.todolists,
        tasks: state.tasks,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        addTodolist: (title: string)=> {
            dispatch(AddTodolistAC(title))
        }
    }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)