import {
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_RESET
} from '../constants/userConstants'

const user=localStorage.getItem("userInfo")
const userInfoFromStorage=user?JSON.parse(user):null


const initialStateUserRegisterReducer = {loading : false,error : null}

export const userRegisterReducer = (state=initialStateUserRegisterReducer,action) => {
    const {type, payload} = action
    switch(type){
        case USER_REGISTER_REQUEST:
            return {
                loading : true,
                error : null
            }
        case USER_REGISTER_SUCCESS :
            return {
                loading : false,
                userInfo : payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading : false,
                error : payload
            }
        default:
            return state
    }
}

const initialStateUserLoginReducer = {
    loading : false,error : null,
    userInfo : userInfoFromStorage
}

export const userLoginReducer = (state=initialStateUserLoginReducer,action) => {
    const {type,payload} = action
    switch(type){
        case USER_LOGIN_REQUEST:
            return {
                loading : true,
                error : null
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading : false,
                userInfo : payload,
                error : null
            }
        case USER_LOGIN_FAIL:
            return {
                loading : false,
                error : payload
            }
        case USER_LOGIN_RESET:
            return {
                loading : false,
                error : null
            }
        default :
            return state
    }
}
