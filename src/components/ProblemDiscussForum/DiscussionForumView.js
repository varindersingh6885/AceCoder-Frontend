import React,{useEffect} from 'react'
// import {useSelector} from 'react-redux'
import Quill from "quill";
import hljs from 'highlight.js'

import './DiscussionForumView.css'
import "quill/dist/quill.snow.css";
import 'highlight.js/styles/github-gist.css'



const DiscussionForumView = ({contents}) => {

    const createView = () => {
        const div = document.getElementById("discussion-forum-view");
        if (div) {
          div.innerHTML = null;
          const editor = document.createElement("div");
          editor.setAttribute("spellcheck", "false");
          editor.classList.add("discussion-view");
          div.appendChild(editor);
        }
    
        const q = new Quill(".discussion-view", {
          theme: "snow",
          modules: { 
              toolbar: false,
            syntax : {
                highlight : text => hljs.highlightAuto(text).value 
            }
          },
        });
        return q;
      };

    useEffect(() => {
        const q = createView();
        q.setContents(contents)
        q.disable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="discussion-forum-view">
            
        </div>
    )
}


export default DiscussionForumView
