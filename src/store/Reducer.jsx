import * as actionTypes from './actionTypes/actionTypes.js'

const initialState = {
    isAuth: false
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                isAuth: action.payload !=null
            }
        default:
            return state
        }
}
