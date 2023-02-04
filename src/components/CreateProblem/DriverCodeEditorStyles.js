import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container : {
      width: "100%",
      height : '84%',
      position: "relative",
      backgroundColor : 'white',
    },
    header: {
      height: "6%",
      width: "100%",
      position: "relative",
    },
    editor: {
      height: "100%",
      width: "100%",
    },
    footer: {
      height: "10%",
      width: "100%",
    },
    buttonsBottom : {
      [theme.breakpoints.down('xs')] : {
        fontSize : '0.6rem'
      }
    },
    submit: {
      backgroundColor: theme.palette.primary,
      color: "#FFF",
      marginRight: "0.5em",
      "&:hover": {
        backgroundColor: "green",
        color: "white",
      }
    },
    menu: {},
    menuItem: {
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
    output: {
      position: "absolute",
      bottom: 0,
      background: "white",
      height: "45%",
      width: "100%",
      zIndex: 10,
      color: "black",
      overflowY: "auto",
    },
    resultButton : {
      outline : 'none',
      borderColor : 'transparent',
      '&:active' : {
        backgroundColor : 'green'
      }
    }
  }));

  export default useStyles;