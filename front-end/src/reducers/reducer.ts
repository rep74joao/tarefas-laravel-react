import {ActionsTypes} from "./actions";

interface StateType {
    user: [],
    token: string,
    tasks: [],
}

export function userReducer(state: StateType, action: any ){
    switch (action.type){

        case ActionsTypes.GET_DATA_STORAGE: {
            return {
                ...state,
                user : action.user,
                token: action.token,
                tasks: action.tasks,
            }
        }

        case ActionsTypes.GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks,
            }
        }

            default:
                return state;
    }
}