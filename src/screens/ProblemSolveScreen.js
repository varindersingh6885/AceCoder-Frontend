import React,{useState} from "react";
import {useSelector} from 'react-redux'
import { Grid, Paper,LinearProgress,Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

import ProblemDescription from '../components/ProblemDescription'

import EditorScreen from "./EditorScreen";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100vh',
    [theme.breakpoints.down('sm')] :{
      height : '100%',
      minWidth : '350px',
      overflowX : 'auto'
    },
  },
  toolbarMargin: {
    paddingTop: "4em",
    height: "100%"
  },
  description: {
    backgroundColor: "#FFF",
    overflowY : 'auto',
    overflowX : 'hidden',
    height : '100%',
    [theme.breakpoints.down('sm')] : {
      padding : '1rem',
    }
  },
  editor : {
    height : '100%',
    [theme.breakpoints.down('sm')]:{
      height : '85vh',
      minWidth : '350px',
      padding : '1rem'
    }
  }
}));

const ProblemSolveScreen = (props) => {
  const classes = useStyles();
  const [view, setView] = useState("description");
  
  const getProblem = useSelector(state => state.getProblem)
  const {loading, error,problem, success} = getProblem


  return (
    <Paper className={classes.paper} >
      <Grid container className={classes.toolbarMargin} direction='row'>
        {loading && <Grid item xs={12}>
          <LinearProgress />
        </Grid>}
        
        <Grid container item  md={6} className={classes.description} alignItems='flex-start'>
          {success &&<Grid container style={{backgroundColor : "#F3F3F3",height : "6%",position : "sticky", top : 0,zIndex : 10,borderBottom : '1px solid grey'}}>
              <Grid container item>
                  <Button onClick={()=>{
                    setView("description")
                  }}>Description</Button>
                  <Button onClick={()=>{
                    setView("editorial")
                  }}>Editorial</Button>
                  <Button onClick={()=>{
                    setView("discuss")
                  }}>Discuss</Button>
                  <Button onClick={()=>{
                    setView("submissions")
                  }}>Submissions</Button>
              </Grid>
            </Grid>
          }
          <Grid style={{height : "94%",width :"100%"}}>
            <ProblemDescription {...props} view={view} setView={setView} />
          </Grid>
        </Grid>
        <Grid container item  md={6} className={classes.editor}>
          {!loading && <EditorScreen problem={problem} />}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProblemSolveScreen;
