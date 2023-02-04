import {
    PROBLEM_GET_REQUEST,
    PROBLEM_GET_SUCCESS,
    PROBLEM_GET_FAIL,
    PROBLEM_GET_ALL_REQUEST,
    PROBLEM_GET_ALL_SUCCESS,
    PROBLEM_GET_ALL_FAIL 
} from '../constants/problemConstants'

const initialStateGetProblemReducer = {
    loading : false,
    error : null,
    problem : {},
    success : false
}

export const getProblemReducer = (state=initialStateGetProblemReducer,action) => {
    const {type,payload} = action
    switch(type){
        case PROBLEM_GET_REQUEST:
            return { loading : true, error : null,success : false}
        case PROBLEM_GET_SUCCESS:
            return {
                loading : false,
                problem : payload,
                error : null,
                success : true
            }
        case PROBLEM_GET_FAIL:
            return {
                loading : false,
                error : payload,
                success : false
            }
        default:
            return state
    }
}

export const getProblemsAllReducer = (state={
    loading : false,
    error : null
},action) =>{
    const {type,payload} = action
    switch(type) {
        case PROBLEM_GET_ALL_REQUEST:
            return {
                loading : true,
                error : null
            }
        case PROBLEM_GET_ALL_SUCCESS:
            return {
                loading : false,
                problems : payload,
                error : null
            }
        case PROBLEM_GET_ALL_FAIL:
            return {
                loading : false,
                error : payload
            }
        default:
            return state;
    }
}