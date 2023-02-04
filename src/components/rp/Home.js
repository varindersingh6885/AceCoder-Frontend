import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HomeTable from './HomeTable'
import { getProblems} from "../../actions/problemsActions";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getProblemsAll = useSelector((state) => state.getProblemsAll);
  const { loading, error, problems } = getProblemsAll;

  useEffect(() => {
    dispatch(getProblems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
         <HomeTable  questions={problems}/>
        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </div>
  );
}