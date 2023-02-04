import React from "react";
import { Grid,makeStyles } from "@material-ui/core";

import EditorScreen from "./EditorScreen";

const useStyles = makeStyles(theme => ({
    editor : {
        minHeight : '90vh',
        [theme.breakpoints.down('sm')] : {
            padding : "3rem"
        }
    },
    description : {
        minHeight : '80vh',
        overflowY : 'auto',
        backgroundColor : 'darkblue',
        [theme.breakpoints.down('sm')] : {
            padding : "3rem"
        }
    }
}))

const Temp = () => {
    const classes = useStyles();
  return (
    <Grid container style={{ backgroundColor: "grey", minHeight: "100vh",paddingTop:'4em' }}>
        <Grid item xs={12} md={6} className={classes.description}>
            hello
        </Grid>
        <Grid item xs={12} md={6}  className={classes.editor}>
            <EditorScreen />
        </Grid>
    </Grid>
  );
};

export default Temp;
