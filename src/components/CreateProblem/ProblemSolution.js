import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { Save as SaveIcon } from "@material-ui/icons";

import {
  defaultTemplateChange,
  solutionChange,
} from "../../actions/createProblemActions";

import EditorScreen from "../../screens/EditorScreen";
import DriverCodeEditor from "./DriverCodeEditor";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
  },
}));

const ProblemSolution = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [driverCode, setDriverCode] = useState("Write your Driver Code here");
  const [driverCodeLanguage, setDriverCodeLanguage] = useState("java");

  const saveDriverCodeHandler = () => {
    dispatch(solutionChange(driverCodeLanguage, driverCode));
  };

  const saveDefaultTemplateHandler = (defaultTemplate) => {
    dispatch(defaultTemplateChange(driverCodeLanguage, defaultTemplate));
  };

  return (
    <>
      <Grid container justify="flex-start" item className={classes.container}>
        <Grid container item xs={6} >
          <Grid
            container
            item
            xs={12}
            justify="center"
            style={{ height: "6%",borderBottom : "1px solid grey", boxSizing : 'border-box' }}
          >
            <Button
              startIcon={<SaveIcon />}
              variant="outlined"
              style={{
                height: "100%",
                borderRadius: 0,
                borderBottom : 'transparent'
              }}
              title="Save Current Driver Code"
              onClick={saveDriverCodeHandler}
            >
              Save
            </Button>
          </Grid>
          <DriverCodeEditor setDriverCode={setDriverCode} />
          <Grid container style={{height : '10%'}}>

          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <EditorScreen
            isCreatingProblem={true}
            driverCode={driverCode}
            saveDefaultTemplateHandler={saveDefaultTemplateHandler}
            setDriverCodeLanguage={setDriverCodeLanguage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProblemSolution;
