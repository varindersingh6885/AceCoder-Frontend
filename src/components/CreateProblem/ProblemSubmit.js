import React from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {submitProblem} from '../../actions/createProblemActions'

const ProblemSubmit = () => {
    const dispatch = useDispatch();

    const createProblem = useSelector(state => state.createProblem);

    const submitProblemHandler = () => {
        dispatch(submitProblem(createProblem));
    }
    
    return (
        <div style={{width : '100%',height : '90vh',display : 'flex', justifyContent : 'center',alignItems: 'center',}}>
            <button onClick={submitProblemHandler}>Submit Problem</button>
        </div>
    )
}

export default ProblemSubmit
