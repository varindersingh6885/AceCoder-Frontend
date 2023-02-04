import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./DriverCodeEditorStyles";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-textmate";

import { java } from "../../codeDefault/driverCodeDefault";


const onLoad = (e) => {
  // console.log("editor loaded");
};

const DriverCodeEditor = ({mode="java",language="java",setDriverCode}) => {
  const classes = useStyles();
  const [javaDefault, setJavaDefault] = useState(java);

  const [value, setValue] = useState("");


  useEffect(() => {
    if (language === "java") {
        setValue(javaDefault);
        setDriverCode(javaDefault);
    }
  }, [language, javaDefault,setDriverCode]);


  const handleEditorValueChange = (value) => {
    setValue(value);
    if (language === "java") {
      setJavaDefault(value);
      setDriverCode(value);
    }
  };

  return (
    <Grid className={classes.container}>

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
    </Grid>
  );
};

export default DriverCodeEditor;
