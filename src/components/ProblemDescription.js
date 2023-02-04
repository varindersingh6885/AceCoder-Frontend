import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import Quill from "quill";
import hljs from "highlight.js";
import { useDispatch, useSelector } from "react-redux";
import { getProblemBySearchTitle } from "../actions/problemsActions";

import ProblemDiscussForum from "./ProblemDiscussForum/ProblemDiscussForum";

import "./ProblemDescription.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github-gist.css";

const ProblemDescription = ({ match, history,view,setView }) => {
  const dispatch = useDispatch();
  const [quillDescription, setQuillDescription] = useState(null);
  const [quillEditorial, setQuillEditorial] = useState(null);
  const getProblem = useSelector((state) => state.getProblem);
  const { problem, loading, error, success } = getProblem;

  const createQuillDescription = () => {
    const div = document.getElementById("problem-description-view");
    if (div) {
      div.innerHTML = null;
      const editor = document.createElement("div");
      editor.setAttribute("spellcheck", "false");
      editor.classList.add("description-view");
      div.appendChild(editor);
    }

    const q = new Quill(".description-view", {
      theme: "snow",
      modules: { toolbar: false },
      //   readOnly : true
    });

    q.on("text-change", (delta, oldDelta, source) => {});
    q.setText("description");
    setQuillDescription(q);
    return q;
  };

  const createQuillEditorial = () => {
    const div = document.getElementById("problem-editorial-view");
    if (div) {
      div.innerHTML = null;
      const editor = document.createElement("div");
      editor.setAttribute("spellcheck", "false");
      editor.classList.add("editorial");
      div.appendChild(editor);
    }

    const q = new Quill(".editorial", {
      theme: "snow",
      modules: {
        toolbar: false,
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,
        },
      },

      //   readOnly : true
    });
    q.setText("Editorial");
    setQuillEditorial(q);
    return q;
  };

  const getData = () => {
    dispatch(getProblemBySearchTitle(match.params.title));
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
      const qDescription = createQuillDescription();
      qDescription.setContents(problem.description);
      setQuillDescription(qDescription);
      qDescription.disable();

      const qEditorial = createQuillEditorial();

      qEditorial.setContents(problem.editorial);
      setQuillEditorial(qEditorial);
      qEditorial.disable();
    }
  }, [success, problem]);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <Grid container alignContent="flex-start" style={{height : "100%",overflow : 'auto'}}>
          <div style={{ width: "100%", padding: "1rem" }}>
            <b style={{ textTransform: "uppercase", fontSize: "1.2rem" }}>
              {problem ? problem.title : ""}
            </b>
            <div style={{ paddingTop: "0.5rem" }}>
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: "0.8rem",
                  color:
                    problem.difficulty === "easy"
                      ? "green"
                      : problem.difficulty === "medium"
                      ? "orange"
                      : "red",
                }}
              >
                {problem.difficulty}
              </span>
            </div>
          </div>

          <hr
            style={{ width : '100%',height : "1px",background : "grey",border : '1px 0 0 solid grey',margin : "0 1rem 1rem"}}
          />

          <div
            id="problem-description-view"
            style={{
              width: "100%",
              display: view === "description" ? "block" : "none",
            }}
          ></div>
          <div
            id="problem-editorial-view"
            style={{
              width: "100%",
              display: view === "editorial" ? "block" : "none",
            }}
          ></div>
          {view === "discuss" && <ProblemDiscussForum />}
          <div
            style={{
              width: "100%",
              display: view === "submissions" ? "block" : "none",
            }}
          >
            Submissions feature will be added soon
          </div>
          {view === "description" && (
            <div style={{ padding: "1rem" }}>show contributors</div>
          )}
        </Grid>
      )}
    </>
  );
};

export default ProblemDescription;
