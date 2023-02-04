import axios from 'axios'
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

export const submit = (user,title,text,problemId) => async dispatch => {

    const discussion = {
        userId : user._id,
        title,
        text
    }

    dispatch({
        type : PROBLEM_DISCUSSION_SUBMIT_REQUEST
    })

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    try {
        const {data} = await axios.post(`/discussions/submit/${problemId}`,JSON.stringify(discussion),config)
        dispatch({
            type : PROBLEM_DISCUSSION_SUBMIT_SUCCESS,
            payload : data
        })
        dispatch(getAllDiscussions(problemId))
    } catch (error) {
        dispatch({
            type : PROBLEM_DISCUSSION_SUBMIT_FAIL,
            payload : error.response
        })
    }

} 

export const getAllDiscussions = (problemId) => async dispatch => {

    dispatch({
        type : PROBLEM_DISCUSSIONS_GET_ALL_REQUEST
    })

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    try {
        const {data} = await axios.get(`/discussions/getAll/${problemId}`,config)
        dispatch({
            type : PROBLEM_DISCUSSIONS_GET_ALL_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PROBLEM_DISCUSSIONS_GET_ALL_FAIL,
            payload : error.response
        })
    }

}


export const getDiscussion = (discussionId) => async dispatch => {

    dispatch({
        type : PROBLEM_DISCUSSION_GET_REQUEST
    })

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    try {
        const {data} = await axios.get(`/discussions/get/${discussionId}`,config)
        dispatch({
            type : PROBLEM_DISCUSSION_GET_SUCCESS,
            payload : data
        })
        return;
    } catch (error) {
        dispatch({
            type : PROBLEM_DISCUSSION_GET_FAIL,
            payload : error.response
        })
    }

}