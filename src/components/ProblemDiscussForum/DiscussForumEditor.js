import React,{useEffect} from 'react'
import Quill from 'quill';
import hljs from 'highlight.js'

import "quill/dist/quill.snow.css";
import 'highlight.js/styles/github-gist.css'
import './DiscussForumEditor.css'


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

const DiscussForumEditor = ({id,setText}) => {


    useEffect(() => {
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
          syntax : {
            highlight : text => hljs.highlightAuto(text).value 
          }
        },
        // readOnly : true
      });
      q.on("text-change", (delta, oldDelta, source) => {
        setText(q.getContents())
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (    
        <div id={id}></div>
    )
}

export default DiscussForumEditor
