import {
    PROBLEM_CUSTOM_INPUT_EVALUATE_FAIL,
    PROBLEM_CUSTOM_INPUT_EVALUATE_REQUEST,
    PROBLEM_CUSTOM_INPUT_EVALUATE_SUCCESS,
    PROBLEM_SUBMISSION_EVALUATE_FAIL,
    PROBLEM_SUBMISSION_EVALUATE_REQUEST,
    PROBLEM_SUBMISSION_EVALUATE_SUCCESS,
} from '../constants/codeExecutionConstants';

export const submissionEvaluateReducer = (state={loading : false, error : null}, action) => {
    const {type, payload} = action;

    switch(type){
        case PROBLEM_SUBMISSION_EVALUATE_REQUEST:
            return {
                loading : true,
                error : null
            }
        case PROBLEM_SUBMISSION_EVALUATE_SUCCESS:
            return {
                loading : false,
                output : payload
            }
        case PROBLEM_SUBMISSION_EVALUATE_FAIL:
            return {
                loading : false,
                error : payload
            }

        default:
            return state;
    }
}

export const customInputEvaluateReducer = (state={loading : false, error : null}, action) => {
    const {type, payload} = action;

    switch(type){
        case PROBLEM_CUSTOM_INPUT_EVALUATE_REQUEST:
            return {
                loading : true,
                error : null
            }
        case PROBLEM_CUSTOM_INPUT_EVALUATE_SUCCESS:
            return {
                loading : false,
                output : payload
            }
        case PROBLEM_CUSTOM_INPUT_EVALUATE_FAIL:
            return {
                loading : false,
                error : payload
            }

        default:
            return state;
    }
}