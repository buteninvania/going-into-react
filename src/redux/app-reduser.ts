import {getAuthUserData} from "./auths-reducer"
import {BaseThunkType, InferActionsTypes} from "./redux-store"

const initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ButInProject/app/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: "ButInProject/app/INITIALIZED_SUCCESS"} as const)
}

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    promise.then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer

export type InitialStateType = typeof initialState
export type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
