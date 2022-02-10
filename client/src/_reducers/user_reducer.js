import {
    LOGIN_USER, 
    REGISTER_USER
} from '../_actions/types'

export default function (state = {},action){
    switch (action.type) {
        case LOGIN_USER:
            //spread operator : ...state 
            return {...state, loginSuccess: action.payload }
            break;
    
        case REGISTER_USER:
            return { ...state, registerSuccess:action.payload }
            break;
        default:
            return state;
    }
} 