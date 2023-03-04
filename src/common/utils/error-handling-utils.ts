import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../App/app-reducer";
import {ResponseType} from "../../api/todolists-api";

type ErrorUtilsDispatchType = Dispatch<SetAppStatusAT | SetAppErrorAT>

export const handleServerAppError = <T>(resData: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (resData.messages.length) {
        dispatch(setAppErrorAC(resData.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (err: { name: string, message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(err.name + ': ' + err.message))
    dispatch(setAppStatusAC('failed'))
}