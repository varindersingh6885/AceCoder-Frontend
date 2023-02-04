import {
    PROBLEM_DISCUSSION_SUBMIT_FAIL,
    PROBLEM_DISCUSSION_SUBMIT_REQUEST,
    PROBLEM_DISCUSSION_SUBMIT_SUCCESS,
    PROBLEM_DISCUSSIONS_GET_ALL_FAIL,
    PROBLEM_DISCUSSIONS_GET_ALL_REQUEST,
    PROBLEM_DISCUSSIONS_GET_ALL_SUCCESS,
    PROBLEM_DISCUSSION_GET_FAIL,
    PROBLEM_DISCUSSION_GET_REQUEST,
    PROBLEM_DISCUSSION_GET_SUCCESS
} from '../constants/discussionsForumsConstants'

export const discussionSubmitReducer = (state={loading : false, error : null}, action) =>{
    const {type, payload} = action

    switch(type){
        case PROBLEM_DISCUSSION_SUBMIT_REQUEST:
            return {
                loading : true,
                error : null
            }
        case PROBLEM_DISCUSSION_SUBMIT_SUCCESS:
            return {
                loading : false,
                error : null,
                discussion : payload
            }
        case PROBLEM_DISCUSSION_SUBMIT_FAIL:
            return {
                loading : false,
                error : payload
            }
        default :
            return state;
    }
}

export const discussionsGetAllReducer = (state={loading : false, error : null}, action) =>{
    const {type, payload} = action

    switch(type){
        case PROBLEM_DISCUSSIONS_GET_ALL_REQUEST:
            return {
                loading : true,
                error : null
            }
        case PROBLEM_DISCUSSIONS_GET_ALL_SUCCESS:
            return {
                loading : false,
                error : null,
                discussions : payload
            }
        case PROBLEM_DISCUSSIONS_GET_ALL_FAIL:
            return {
                loading : false,
                error : payload
            }
        default :
            return state;
    }
}

export const discussionGetReducer = (state={loading : false, error : null}, action) =>{
    const {type, payload} = action

    switch(type){
        case PROBLEM_DISCUSSION_GET_REQUEST:
            return {
                loading : true,
                error : null
            }
        case PROBLEM_DISCUSSION_GET_SUCCESS:
            return {
                loading : false,
                error : null,
                discussion : payload
            }
        case PROBLEM_DISCUSSION_GET_FAIL:
            return {
                loading : false,
                error : payload
            }
        default :
            return state;
    }
}