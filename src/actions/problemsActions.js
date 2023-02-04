import axios from 'axios'
import {
    PROBLEM_GET_REQUEST,
    PROBLEM_GET_SUCCESS,
    PROBLEM_GET_FAIL,
    PROBLEM_GET_ALL_REQUEST,
    PROBLEM_GET_ALL_SUCCESS,
    PROBLEM_GET_ALL_FAIL  
} from '../constants/problemConstants'

export const getProblemBySearchTitle = (searchTitle) => async dispatch => {
    dispatch({
        type : PROBLEM_GET_REQUEST
    })
    try {
        const {data} = await axios.get(`/problems/get/${searchTitle}`)
        dispatch({
            type : PROBLEM_GET_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PROBLEM_GET_FAIL,
            payload : error.response.data
        })
    }
}

export const getProblems = () => async dispatch => {
    dispatch({
        type : PROBLEM_GET_ALL_REQUEST
    })
    try {
        const {data} = await axios.get('/problems/get/all')
        dispatch({
            type : PROBLEM_GET_ALL_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PROBLEM_GET_ALL_FAIL,
            payload : error.response.data
        })
    }
}