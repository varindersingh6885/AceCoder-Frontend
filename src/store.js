import {createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {userRegisterReducer,userLoginReducer} from './reducers/userReducer'
import {createProblemReducer,problemSubmitReducer} from './reducers/createProblemReducer'
import {getProblemReducer, getProblemsAllReducer} from './reducers/problemReducer'
import {customInputEvaluateReducer,submissionEvaluateReducer} from './reducers/codeExecutionReducer'
import {discussionSubmitReducer,discussionsGetAllReducer, discussionGetReducer} from './reducers/discussionsForumReducer'

const reducer = combineReducers({
    userRegister : userRegisterReducer,
    userLogin : userLoginReducer,
    createProblem : createProblemReducer,
    problemSubmit : problemSubmitReducer,
    getProblem : getProblemReducer,
    getProblemsAll : getProblemsAllReducer,
    customInputEvaluate : customInputEvaluateReducer,
    submissionEvaluate : submissionEvaluateReducer,
    discussionSubmit : discussionSubmitReducer,
    discussionsGetAll : discussionsGetAllReducer,
    discussionGet : discussionGetReducer
})



const middleware = [thunk]

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store