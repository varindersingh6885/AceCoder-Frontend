import React, { useState, useEffect } from "react";
import { Paper, Grid, makeStyles, Button, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100vh",
    minWidth: "350px",
  },
  container: {
    paddingTop: "4rem",
    height: "100%",
    backgroundColor: "#222222",
  },
  card: {
    padding: "2rem 4rem 5rem",
    borderRadius: "15px",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    backgroundColor: "#141414",
    color: "white",
    textTransform: "uppercase",
  },
  textfield : {
    width: "100%",
    marginTop : "20px",
    borderRadius: "10px",
    boxSizing :"border-box",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{
      border : "1px #FFFFFF solid"
    }
  },
  input: {
    color: "#FFFFFF",
    boxSizing :"border-box",
    borderRadius: "10px",
    textTransform: "none",
  },
  login: {
    width: "100%",
    border: "transparent",
    cursor : "pointer",
    marginTop : "20px",
    /* border: 2px solid red; */
    padding: "3.5% 3%",
    borderRadius: "10px",
    color: "white",
    backgroundColor: "#71BE58",
    "&:hover" : {
      backgroundColor : "#468a30"
    },
    "&:active": {
      backgroundColor : "#25660f"
    },
    "&:disabled" : {
      color : "white"
    }
  },
  register : {
    color : "white",
    backgroundColor : "transparent",
    border : "transparent",
    borderBottom : "1px solid grey",
    marginTop : "15px",
    outline : "none",
    cursor : "pointer"
  }
}));
const LoginScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid
            container
            spacing={2}
            item
            xs={10}
            sm={8}
            md={6}
            lg={4}
            className={classes.card}
          >
            <Grid container justify="center" item xs={12}>
              Sign In
            </Grid>

            {/* <Grid container justify="center" item xs={12}> */}
            <TextField
              id="outlined-email-address-input"
              placeholder="Email Address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.textfield}
              InputProps={{
                className: classes.input,
              }}
            />
            {/* </Grid> */}
            {/* <Grid container justify="center" item xs={12}> */}
            <TextField
              id="outlined-password-input"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textfield}
              InputProps={{
                className: classes.input,
              }}
            />
            {/* </Grid> */}

            <Grid container justify="center" item xs={12}>
            <Button
              disabled={loading}
              onClick={handleSubmit}
              style={{ width: "100%" }}
              variant="contained"
              className={classes.login}
            >
              { loading ? `Signing In` : `Sign In`}
            </Button>
            {error && error.error}
            </Grid>

            <Grid container item xs={12} justify="center">
              <button
                onClick={() => history.push("/register")}
                style={{ fontSize: "0.8rem" }}
                className={classes.register}
              >
                Register Here
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default LoginScreen;
