import React, { useEffect, useState } from "react";
import { Button, Grid,makeStyles } from "@material-ui/core";
import Quill from "quill";
import hljs from 'highlight.js'
import {useDispatch,useSelector} from 'react-redux'
import {handleDescriptionChange,handleDifficultyChange,handleEditorialChange} from '../../../actions/createProblemActions'


import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import 'highlight.js/styles/github-gist.css'


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "link", "video", "blockquote", "code-block"],
  ["clean"],
];

const useStyles = makeStyles( theme => ({
  controlsContainer : {
    height : '90vh',
    [theme.breakpoints.down('xs')] : {
      height : '30vh',
    }
  },
  controls : {
    height : '50%',
    border : '1px solid black',
    [theme.breakpoints.down('xs')] : {
      height : '100%'
    }
  }
}))

const TextEditor = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const createProblem = useSelector(state => state.createProblem)
  const {description,editorial,difficulty,title,searchTitle} = createProblem

  const [quill, setQuill] = useState(null);

  const createQuill = () => {
    const div = document.getElementById(id);
    if (div) {
      div.innerHTML = null;
      const editor = document.createElement("div");
      editor.setAttribute("spellcheck", "false");
      editor.classList.add("editor");
      div.appendChild(editor);
    }

    const q = new Quill(".editor", {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        syntax : id==='problem-editorial' ? {
          highlight : text => hljs.highlightAuto(text).value 
        } : false
      },
      // readOnly : true
    });

    q.on("text-change", (delta, oldDelta, source) => {
      if(id==='problem-description')
        dispatch(handleDescriptionChange(q.getContents()))
      else if(id==='problem-editorial')
        dispatch(handleEditorialChange(q.getContents()))
    });
    if(id==='problem-description'){
      if(description)
        q.setContents(description)
      else
        q.setText(`Write the Problem Description here...`)
    }
    else if(id==='problem-editorial'){
      if(editorial)
        q.setContents(editorial)
      else
        q.setText('Wrte the Editorial here...')
    }
    
      setQuill(q);
  };

  useEffect(() => {
    createQuill();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDifficulty = (e) => {
    dispatch(handleDifficultyChange(e.target.value))
  }

  const saveContents = () => {
    const delta = JSON.stringify(quill.getContents());
    localStorage.setItem('problem-difficulty',JSON.stringify(difficulty))
    localStorage.setItem('problem-title',JSON.stringify(title))
    localStorage.setItem('problem-search-title',JSON.stringify(searchTitle))
    if(id==='problem-description')
      localStorage.setItem(`${id}-delta`, delta);
    else if (id==='problem-editorial')
      localStorage.setItem(`${id}-delta`, delta);
  };

  const retreiveContents = () => {
    let delta = null;
    if(id==='problem-description')
      delta = JSON.parse(localStorage.getItem(`${id}-delta`))
    else if(id==='problem-editorial')
      delta = JSON.parse(localStorage.getItem(`${id}-delta`))
      
    quill.setContents(delta, "user");
  };

  const disableUserInput = () => {
    quill.disable();
  };
  const enableUserInput = () => {
    quill.enable();
  };

  return (
    <>
    <Grid container item xs={12} style={{ height: "100%",minHeight : '400px',}}>
        <Grid
          item
          xs={12}
          sm={9}
          id={id}
          
        ></Grid>

        <Grid container item xs={12} sm={3} className={classes.controlsContainer} alignItems='flex-start'>

          <Grid container className={classes.controls}  item xs={6} sm={12}>
            <Grid item xs={12}>
              <select value={difficulty} onChange={handleDifficulty}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </Grid>
          </Grid>

          <Grid container className={classes.controls} item xs={6} sm={12} direction='column'>
            
            <Grid item>
              <Button
                style={{ width: "100%" }}
              
                variant="contained"
                onClick={saveContents}
              >
                save
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ width: "100%" }}
              
                variant="contained"
                onClick={retreiveContents}
              >
                retreive
              </Button>
            </Grid>

            <Grid item>
              <Button
                style={{ width: "100%" }}
              
                variant="contained"
                onClick={disableUserInput}
              >
                disable
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ width: "100%" }}
              
                variant="contained"
                onClick={enableUserInput}
              >
                enable
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TextEditor;
