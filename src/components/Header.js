import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

import {
  AppBar,
  Toolbar,
  makeStyles,
  Button,
  ButtonGroup,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: "4rem",
    zIndex: 1302,
    backgroundColor: "black",
  },
  title: {
    marginLeft: "10px",
    fontSize: "2rem",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  logo: {
    height: "5rem",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    color : "white",
    // fontFamily: "Railway",
    textTransform: "none",
    fontWeight: "700",
    fontSize: "1rem",
    minWidth: 10,
    marginLeft: "25px",
  },
  login: {
    marginLeft: "25px",
    borderRadius: "15px",
    // width: "90px",
    backgroundColor : "#71BE58",
    "&:hover": {
      backgroundColor : "#468a30",
    },
  },
  signup: {
    marginRight: "25px",
    borderRadius: "15px",
    backgroundColor : "#71BE58",
    "&:hover": {
      backgroundColor : "#468a30",
    },
    // width: "90px",
  },
  menu: {
    marginLeft: "auto",
    margintRight: "1rem",
    color: "white",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    paddingTop: "4rem",
    backgroundColor: "#F3F3F3",
    height: "100%",
  },
  listItem: {
    textTransform: "none",
    color: "black",
  },
}));

const routes = [
  { name: "Home", link: "/", activeIndex: 0, icon: <HomeIcon /> },
  {
    name: "Create Problem",
    link: "/create-problem",
    activeIndex: 1,
    icon: <CreateIcon />,
  },
  { name: "About Us", link: "/about-us", activeIndex: 2, icon: <InfoIcon /> },
];

const Header = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("sm"));

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    routes.forEach((route) => {
      switch (window.location.pathname) {
        case route.link:
          setValue(route.activeIndex);
          break;
        default:
          break;
      }
    });
  }, [value]);

  const handleLogout = () => {
    setOpenDrawer(false);
    dispatch(logout());
    history.push('/')
    setValue(0)
  };

  const tabs = (
    <>
      <Grid style={{marginLeft : 'auto'}}>
        {routes.map((route) => (
          <Button
            key={`${route.activeIndex} ${route.link}`}
            className={classes.tab}
            label={route.name}
            component={Link}
            to={route.link}
            draggable={false}
          >{route.name}</Button>
        ))}
      </Grid>
      {!userInfo && (
        <ButtonGroup>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            color="secondary"
            className={classes.login}
            draggable={false}
          >
            Login
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            color="secondary"
            className={classes.signup}
            draggable={false}
          >
            Sign Up
          </Button>
        </ButtonGroup>
      )}
      {userInfo && (
        <Button
          variant="contained"
          color="secondary"
          className={`${classes.signup} ${classes.login}`}
          onClick={handleLogout}
        >
          {`${userInfo.name} {logout}`}
        </Button>
      )}
    </>
  );

  const drawer = (
    <SwipeableDrawer
      anchor="left"
      open={openDrawer}
      onOpen={() => setOpenDrawer(true)}
      onClose={() => setOpenDrawer(false)}
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        className={classes.drawer}
      >
        <List>
          {!userInfo && (
            <>
              <ListItem
                onClick={() => setOpenDrawer(false)}
                component={Link}
                to="/login"
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText className={classes.listItem}>
                  Sign In
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => setOpenDrawer(false)}
                component={Link}
                to="/register"
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText className={classes.listItem}>
                  Sign up
                </ListItemText>
              </ListItem>
            </>
          )}

          {routes.map((route) => (
            <ListItem
              key={`${route.activeIndex} ${route.link}`}
              component={Link}
              to={route.link}
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText className={classes.listItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          {userInfo && (
            <ListItem
              onClick={handleLogout}
              component={Link}
              to="/login"
              className={classes.listItem}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText disableTypography>Logout</ListItemText>
            </ListItem>
          )}
        </List>
      </Grid>
    </SwipeableDrawer>
  );

  return (
    <>
      <AppBar
        elevation={1}
        className={classes.appbar}
        position="fixed"
        color="primary"
      >
        <Toolbar disableGutters style={{ height: "100%" }}>
          <Button
            onClick={() => setValue(0)}
            component={Link}
            to="/"
            className={classes.title}
            draggable={false}
          >
            Ace Coder
          </Button>
          {isMd ? drawer : tabs}
          {isMd && (
            <Button
              className={classes.menu}
              onClick={() => setOpenDrawer((openDrawer) => !openDrawer)}
            >
              <MenuIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
