import {combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);