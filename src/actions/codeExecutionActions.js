import axios from 'axios'

import {
    PROBLEM_CUSTOM_INPUT_EVALUATE_FAIL,
    PROBLEM_CUSTOM_INPUT_EVALUATE_REQUEST,
    PROBLEM_CUSTOM_INPUT_EVALUATE_SUCCESS,
    PROBLEM_SUBMISSION_EVALUATE_FAIL,
    PROBLEM_SUBMISSION_EVALUATE_REQUEST,
    PROBLEM_SUBMISSION_EVALUATE_SUCCESS,
} from '../constants/codeExecutionConstants';

export const customInputOutput = (source, lang='java',input,problem,isCreatingProblem) => async dispatch => {
    const program = {
        script : source,
        language: lang,
        stdin : input
    };

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
// console.log(program);
    try {
        dispatch({
            type : PROBLEM_CUSTOM_INPUT_EVALUATE_REQUEST
        })
        if(isCreatingProblem){
            const {data} = await axios.post(`/code/execute`,program,config);
            dispatch({
                type : PROBLEM_CUSTOM_INPUT_EVALUATE_SUCCESS,
                payload : data
            })
            return
        }

        const {data} = await axios.post(`/code/execute/${problem._id}`, program, config);
        // console.log(data);
        dispatch({
            type : PROBLEM_CUSTOM_INPUT_EVALUATE_SUCCESS,
            payload : data
        })

    } catch (error) {
        dispatch({
            type : PROBLEM_CUSTOM_INPUT_EVALUATE_FAIL,
            payload : error.response.data
        })
    }
}

export const submissionOutput = (source, lang='java',input,problem,isCreatingProblem) => async dispatch => {
    const program = {
        script : source,
        language: lang,
        stdin : input
    };

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }
// console.log(program);
    try {
        dispatch({
            type : PROBLEM_SUBMISSION_EVALUATE_REQUEST
        })
        if(isCreatingProblem){
            const {data} = await axios.post(`/code/submission`,program,config);
            return data;
        }

        const {data} = await axios.post(`/code/submission/${problem._id}`, program, config);
        
        dispatch({
            type : PROBLEM_SUBMISSION_EVALUATE_SUCCESS,
            payload : data
        })
        return
    } catch (error) {
        dispatch({
            type : PROBLEM_SUBMISSION_EVALUATE_FAIL,
            payload : error.response.data
        })
    }
}

