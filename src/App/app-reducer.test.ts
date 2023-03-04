import {appInitialState, appReducer, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let state = appInitialState
beforeEach(() => {
    state = appInitialState
})

test('app status should be changed', () => {
    const newStatus = 'succeed'
    const newState = appReducer(state, setAppStatusAC(newStatus))

    expect(newState.status).toBe(newStatus)
    expect(newState.error).toBe(state.error)
})

test('app error should be changed', () => {
    const newError = 'some error occurred'
    const newState = appReducer(state, setAppErrorAC(newError))

    expect(newState.status).toBe(state.status)
    expect(newState.error).toBe(newError)
})