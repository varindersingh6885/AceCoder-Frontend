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

const initialState = {
    difficulty : localStorage.getItem('problem-difficulty') ? JSON.parse(localStorage.getItem('problem-difficulty')) : 'easy',
    description : localStorage.getItem('problem-description-delta') ? JSON.parse(localStorage.getItem('problem-description-delta')) : null,
    editorial : localStorage.getItem('problem-editorial-delta') ? JSON.parse(localStorage.getItem('problem-editorial-delta')) : null,
    title : localStorage.getItem('problem-title') ? JSON.parse(localStorage.getItem('problem-title')) : '',
    searchTitle : localStorage.getItem('problem-search-title') ? JSON.parse(localStorage.getItem('problem-search-title')) : '',
    defaultTemplate : [],
    solution : [],
    testcases : []
}

export const createProblemReducer = (state=initialState,action) => {
    const {type,payload} = action
    switch(type) {
        case PROBLEM_TITLE_CHANGE: 
            return {
                ...state,
                title : payload,
                searchTitle : payload.toLowerCase().trim().split(' ').join('-')
            }
        case PROBLEM_DESCRIPTION_CHANGE:
            return {
                ...state,
                description : payload
            }
        case PROBLEM_DIFFICULTY_CHANGE:
            return {
                ...state,
                difficulty : payload
            }
        case PROBLEM_EDITORIAL_CHANGE:
            return {
                ...state,
                editorial : payload
            }
        case PROBLEM_DEFAULT_TEMPLATE_CHANGE:
            const newDefaultTemplate = [...state.defaultTemplate];
            let defaultTemplateExists = false;
            for(let i=0; i<newDefaultTemplate.length; i++){
                if(newDefaultTemplate[i].language === payload.language){
                    defaultTemplateExists = true;
                    newDefaultTemplate[i].code = payload.code;
                    break;
                }
            }
            if(!defaultTemplateExists){
                newDefaultTemplate.push(payload);
            }
            return {
                ...state,
                defaultTemplate : newDefaultTemplate
            }
        case PROBLEM_SOLUTION_CHANGE:
            const newSolution = [...state.solution];
            let solutionExists = false;
            for(let i=0; i<newSolution.length; i++){
                if(newSolution[i].language === payload.language){
                    solutionExists = true;
                    newSolution[i].code = payload.code;
                    break;
                }
            }
            if(!solutionExists){
                newSolution.push(payload);
            }
            return {
                ...state,
                solution : newSolution
            }
        case PROBLEM_TESTCASES_ADD_ONE:
            const newTestcases = state.testcases.filter( testcase => {
                return testcase.input !== payload.input
            })
            newTestcases.push(payload);
            
            return {
                ...state,
                testcases : newTestcases
            }
        default:
            return state;
    }
}

const initialStateProblemReducer = {
    loading : false,
    error : null
}

export const problemSubmitReducer = (state=initialStateProblemReducer,action) => {
    const {type,payload} = action
    switch(type) {
        case PROBLEM_SUBMIT_REQUEST:
            return {
                loading : true,
                error : false
            }
        case PROBLEM_SUBMIT_SUCCESS: 
            return {
                loading : false,
                error : null,
                problem : payload
            }
        case PROBLEM_SUBMIT_FAIL:
            return {
                loading : false,
                error : payload,
            }
        default : 
            return state
    }
}