import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import useStyles from "./EditorScreenStyles";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-textmate";

import { customInputOutput,submissionOutput } from "../actions/codeExecutionActions";
import {testcasesAddOne} from '../actions/createProblemActions'
import { java, cpp, python3 } from "../codeDefault/codeDefault";
import { Button } from "@material-ui/core";
import {
  Code as CodeIcon,
  Add as AddIcon,
  DoneAll as DoneAllIcon,
  ArrowDropDown,
  ExpandLess as ExpandLessIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  Fullscreen as FullScreenIcon
} from "@material-ui/icons";

import { CircularProgress, Menu, MenuItem } from "@material-ui/core";

const onLoad = (e) => {
  // console.log("editor loaded");
};

const languages = [
  { name: "Java", code: "java" },
  { name: "C++", code: "cpp" },
  { name: "Python 3", code: "python3" },
];

const EditorScreen = ({
  driverCode = "",
  problem,
  setDriverCodeLanguage,
  isCreatingProblem = false,
  saveDefaultTemplateHandler,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobileWidth = useMediaQuery(theme.breakpoints.down("xs"));
  const [javaDefault, setJavaDefault] = useState(java);

  const [python3Default, setPython3Default] = useState(python3);

  const [cppDefault, setCppDefault] = useState(cpp);

  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [showTestcase, setShowTestcase] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [output, setOutput] = useState(null);
  const [showConsole, setShowConsole] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [language, setLanguage] = useState("java");
  const [mode, setMode] = useState("java");
  const [anchorEl, setAnchorEl] = useState(null);

  const customInputEvaluate = useSelector(state => state.customInputEvaluate);
  const {loading : customInputEvaluateLoading, error : customInputEvaluateError, output : customInputEvaluateOutput} = customInputEvaluate;

  const submissionEvaluate = useSelector(state => state.submissionEvaluate);
  const {loading : submissionEvaluateLoading, error : submissionEvaluateError, output : submissionEvaluateOutput} = submissionEvaluate;
  
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const getSelectedLanguageName = () => {
    switch (language) {
      case "cpp":
        return "C++";
      case "python3":
        return "Python 3";
      default:
        return "Java";
    }
  };

  useEffect(() => {
    if (language === "java") {
      if (problem && problem.defaultTemplate) {
        for (let i = 0; i < problem.defaultTemplate.length; i++) {
          if (language === problem.defaultTemplate[i].language) {
            setValue(problem.defaultTemplate[i].code);
            setJavaDefault(problem.defaultTemplate[i].code);
            break;
          }
        }
      } else setValue(javaDefault);
    } else if (language === "cpp") {
      setValue(cppDefault);
    } else if (language === "python3") {
      setValue(python3Default);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (lang) => {
    // console.log(e.target.value);
    setLanguage(lang);
    isCreatingProblem && setDriverCodeLanguage(lang);

    if (lang === "java") {
      setMode("java");
      setValue(javaDefault);
    } else if (lang === "cpp") {
      setMode("c_cpp");
      setValue(cppDefault);
    } else if (lang === "python3") {
      setMode("python");
      setValue(python3Default);
    }
  };

  const handleEditorValueChange = (newValue) => {
    setValue(newValue);
    if (language === "java") {
      setJavaDefault(newValue);
    } else if (language === "cpp") {
      setCppDefault(newValue);
    } else if (language === "python3") {
      setPython3Default(newValue);
    }
  };

  const handleCompile = () => {
    if(!userInfo){
      alert("User must be logged in !")
      return;
    }
    if (input !== "") {
      setIsCompiling(true);
      setIsSubmitting(false);
      dispatch(
        customInputOutput(
          isCreatingProblem ? `${value}\n${driverCode}` : value,
          language,
          input,
          problem,
          isCreatingProblem
        )
      );
      setOutput(true);
      setShowConsole(true);
      setShowResult(true);
      setShowTestcase(false)
    }
  };

  const handleSubmission = () => {
    if(!userInfo){
      alert("User must be logged in !")
      return;
    }
      setIsSubmitting(true);
      setIsCompiling(false);
      dispatch(
        submissionOutput(
          isCreatingProblem ? `${value}\n${driverCode}` : value,
          language,
          input,
          problem,
          isCreatingProblem
        )
      );    
      setOutput(true);
      setShowConsole(true);
      setShowResult(true);
      setShowTestcase(false)
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const testcasePanel = (
    <>
      <Grid container justify="center" direction="column" alignItems="center">
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          spellCheck="false"
          style={{ height: "50%", width: "80%", resize: "none" }}
        ></textarea>
        <Grid container justify="center" item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompile}
            disabled={customInputEvaluateLoading || submissionEvaluateLoading}
            style={{
              outline: "none",
              minWidth: "100px",
              marginTop: "1rem",
              minHeight: "24px",
            }}
            startIcon={customInputEvaluateLoading || submissionEvaluateLoading ? null : <CodeIcon/>}
          >
            {customInputEvaluateLoading || submissionEvaluateLoading ? <CircularProgress size="1.5rem" /> : "Compile"}
          </Button>
          {isCreatingProblem && <Button
            variant="outlined"
            color="primary"
            onClick={()=>{
              if(input!=="")
                dispatch(testcasesAddOne(input))
            }}
            disabled={customInputEvaluateLoading || submissionEvaluateLoading}
            style={{
              outline: "none",
              minWidth: "100px",
              marginTop: "1rem",
              marginLeft : '1rem',
              minHeight: "24px",
            }}
            startIcon={<AddIcon />}
          >
            Add testcases
          </Button>}
        </Grid>
        
      </Grid>
    </>
  );

  const resultPanel = (
    <>
    {customInputEvaluateLoading && isCompiling && <Grid container justify="center"><CircularProgress size="2rem" /></Grid>}
    {!customInputEvaluateLoading && isCompiling &&
      <Grid justify="space-around" container item style={{ padding: "1em" }}>
        <Grid container justify="flex-start" alignItems="center" item xs={3}>
          Your input
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            padding: "0.5em",
            border: "1px solid rgb(238, 238, 238)",
            color: "#000",
            borderRadius: "3px",
            overflowX: "auto",
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          <pre>{input}</pre>
        </Grid>
      </Grid>
      }
      {!customInputEvaluateLoading && isCompiling && output && !customInputEvaluateError && (
        <Grid justify="space-around" container item style={{ padding: "1em" }}>
          <Grid item container xs={3} justify="flex-start" alignItems="center">
            Output
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              padding: "0.5em",
              border: "1px solid rgb(238, 238, 238)",
              color: "#000",
              borderRadius: "3px",
              overflowX: "auto",
              backgroundColor: "rgb(250, 250, 250)",
            }}
          >
            <pre>{customInputEvaluateOutput.output}</pre>
          </Grid>
        </Grid>
      )}
      {submissionEvaluateLoading && isSubmitting && <Grid container justify="center"><CircularProgress size="2rem" /></Grid>}
      {!submissionEvaluateLoading && isSubmitting &&
        <Grid>
          {submissionEvaluateOutput.output === "{true}" ? 
            <>
              <CheckCircleIcon style={{color : 'green'}} />
              <p>All testcases passed</p>
            </> :
            <>
              <pre>
                Wrong Solution
                Unable to clear all testcases
              </pre>
            </>
          }
        </Grid>
      }
    </>
  );

  const consoleOutput = (
    <Grid item className={classes.output}>
      <Grid
        container
        item
        xs={12}
        style={{ minHeight: "15%", color: "white", border: "1px solid grey" }}
      >
        <Button
          style={{
            backgroundColor: showTestcase ? "grey" : null,
            borderRadius: 0,
          }}
          onClick={() => {
            setShowResult(false);
            setShowTestcase(true);
          }}
        >
          Testcase
        </Button>
        <Button
          className={classes.resultButton}
          onClick={() => {
            setShowResult(true);
            setShowTestcase(false);
          }}
        >
          Result
        </Button>
        <Button
          endIcon={<ArrowDropDown />}
          style={{ marginLeft: "auto" }}
          onClick={() => setShowConsole(false)}
        ></Button>
      </Grid>
      <Grid container style={{ height: "80%", overflowY: "scroll" }}>
        {showResult && output && resultPanel}
        {showTestcase && testcasePanel}
      </Grid>
    </Grid>
  );

  return (
    <Grid className={classes.container}>
      <Grid className={classes.header}>
        <Button
          onClick={handleMenuClick}
          endIcon={<ArrowDropDown />}
          variant="outlined"
          color="primary"
          style={{
            borderRadius: 0,
          }}
        >
          {getSelectedLanguageName()}
        </Button>
        {isCreatingProblem && (
          <Button
            title="Save following code as default template for this problem"
            startIcon={<SaveIcon />}
            variant="outlined"
            style={{
              height: "100%",
              borderRadius: 0,
              borderBottom: "transparent",
            }}
            onClick={() => {
              saveDefaultTemplateHandler(value);
            }}
          >
            Save
          </Button>
        )}
          <Button title="Full Screen" onClick={() =>{
            document.querySelector('.ace_editor').requestFullscreen();
          }}>
            <FullScreenIcon />
          </Button>

        <Menu
          id="simple-menu"
          classes={{ paper: classes.menu }}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {languages.map((lang) => (
            <MenuItem
              key={`${lang.code} ${lang.name}`}
              classes={{ root: classes.menuItem }}
              onClick={() => {
                handleMenuClose();
                handleLanguageChange(lang.code);
              }}
            >
              {lang.name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>

      <Grid className={classes.editor}>
        <AceEditor
          placeholder="Placeholder Text"
          width="100%"
          height="100%"
          mode={mode}
          theme="textmate"
          name="blah2"
          onLoad={onLoad}
          onChange={handleEditorValueChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={value}
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
            showPrintMargin: false,
          }}
        />
      </Grid>
      <Grid container className={classes.footer} alignItems="center">
        <Grid item xs={3}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowConsole(true)}
            className={classes.buttonsBottom}
            style={{
              outline: "none",
              marginRight: "5px",
              marginLeft: "10px",
              minHeigth: "24px",
            }}
            startIcon={isMobileWidth ? null : <ExpandLessIcon />}
          >
            {isMobileWidth ? <ExpandLessIcon /> : "Console"}
          </Button>
        </Grid>
        <Grid container item xs={9} justify="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompile}
              disabled={customInputEvaluateLoading || submissionEvaluateLoading}
              className={classes.buttonsBottom}
              style={{
                outline: "none",
                minWidth: "100px",
                marginRight: "5px",
                marginLeft: "auto",
                minHeigth: "24px",
              }}
              startIcon={customInputEvaluateLoading || submissionEvaluateLoading ? null : <CodeIcon/>}
            >
              {customInputEvaluateLoading ? <CircularProgress size="1.5rem" /> : "Compile"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmission}
              className={[classes.submit, classes.buttonsBottom].join(" ")}
              disabled={customInputEvaluateLoading || submissionEvaluateLoading}
              startIcon={customInputEvaluateLoading || submissionEvaluateLoading ? null : <DoneAllIcon />}
            >
              {submissionEvaluateLoading ? <CircularProgress size="1.5rem" /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {showConsole && consoleOutput}
    </Grid>
  );
};

export default EditorScreen;
