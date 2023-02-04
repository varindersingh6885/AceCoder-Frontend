import React from "react";
import { useDispatch,useSelector } from "react-redux";
import {Grid} from '@material-ui/core'
import { handleTitleChange } from "../../actions/createProblemActions";

import TextEditor from "./TextEditor/TextEditor";

const CreateProblemEditorial = () => {
  const dispatch = useDispatch();

  const createProblem = useSelector(state => state.createProblem) 
  const {title} = createProblem

  const handleChange = (e) => {
    dispatch(handleTitleChange(e.target.value));
  };

  return (
    <Grid style={{padding : '1rem',width : '100%'}}>
      <input
        onChange={handleChange}
        placeholder="Enter Problem Title Here...."
        value={title}
        style={{ width: "100%", height: "2rem",marginBottom : '1rem' }}
      />
      <TextEditor id="problem-editorial" />
    </Grid>
  );
};

export default CreateProblemEditorial;
