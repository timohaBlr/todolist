export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
type AppActionsType = SetAppStatusAT | SetAppErrorAT
type AppStateType = typeof appInitialState
export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'
type AppErrorType = null | string

enum APP {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR',
}

export const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as AppErrorType
}

export const appReducer = (state: AppStateType = appInitialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case APP.SET_STATUS:
            return {...state, status: action.status};
        case APP.SET_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: APP.SET_STATUS, status} as const)
export const setAppErrorAC = (error: AppErrorType) => ({type: APP.SET_ERROR, error} as const)