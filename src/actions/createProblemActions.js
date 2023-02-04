import axios from 'axios'
import {
    PROBLEM_TITLE_CHANGE,
    PROBLEM_DESCRIPTION_CHANGE,
    PROBLEM_DIFFICULTY_CHANGE,
    PROBLEM_EDITORIAL_CHANGE,
    PROBLEM_SUBMIT_FAIL,
    PROBLEM_SUBMIT_REQUEST,
    PROBLEM_SUBMIT_SUCCESS,
    PROBLEM_DEFAULT_TEMPLATE_CHANGE,
    PROBLEM_SOLUTION_CHANGE,
    PROBLEM_TESTCASES_ADD_ONE
} from '../constants/createProblemConstants'

export const handleTitleChange = (title) => async dispatch => {
    dispatch({
        type : PROBLEM_TITLE_CHANGE,
        payload : title
    })
}

export const handleDescriptionChange = (description) => async dispatch => {
    dispatch({
        type : PROBLEM_DESCRIPTION_CHANGE,
        payload : description
    })
}

export const handleDifficultyChange = (difficulty) => async dispatch => {
    dispatch({
        type : PROBLEM_DIFFICULTY_CHANGE,
        payload : difficulty
    })
}

export const handleEditorialChange = (editorial) => async dispatch => {
    dispatch({
        type : PROBLEM_EDITORIAL_CHANGE,
        payload : editorial
    })
}

export const defaultTemplateChange = (language,code) => async dispatch => {
    dispatch({
        type : PROBLEM_DEFAULT_TEMPLATE_CHANGE,
        payload : {language,code}
    })
}

export const solutionChange = (language,code) => async dispatch => {
    dispatch({
        type : PROBLEM_SOLUTION_CHANGE,
        payload : {language,code}
    })
}
export const testcasesAddOne = (input) => async dispatch => {
    dispatch({
        type : PROBLEM_TESTCASES_ADD_ONE,
        payload : {input : input}
    })
}

export const submitProblem = (problem) => async dispatch => {
    dispatch({
        type : PROBLEM_SUBMIT_REQUEST
    })
    
    try {
        // const data = JSON.stringify(problem)
        if(problem.testcases.length > 0) {
            const {data} = await axios.post('/create-problem/submit',{problem : JSON.stringify(problem)})
            dispatch({
                type : PROBLEM_SUBMIT_SUCCESS,
                payload : data
            })
        }else{
            dispatch({
                type : PROBLEM_SUBMIT_FAIL,
                payload : "testcases not defined"
            })    
        }

    } catch (error) {
        dispatch({
            type : PROBLEM_SUBMIT_FAIL,
            payload : error.response.data
        })
    }
}