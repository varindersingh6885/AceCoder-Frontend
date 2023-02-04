import React,{useState,useEffect}from "react";
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import { Button, Grid } from "@material-ui/core";

import DiscussFormEditor from "./DiscussForumEditor";

import {submit,getAllDiscussions} from '../../actions/discussionsForumActions'

const ProblemDiscussForum = () => {
    const dispatch = useDispatch();

    const [create, setCreate] = useState(false);

    const problem = useSelector(state => state.getProblem.problem);
    const {_id : problemId, searchTitle} = problem;

    const discussionsGetAll = useSelector(state => state.discussionsGetAll)
    const {loading : discussionsLoading, discussions} = discussionsGetAll

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const [title , setTitle] = useState("");
    const [text,setText] = useState({ops : []});
    
    useEffect(()=>{
      dispatch(getAllDiscussions(problemId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const discussionSubmitHandler = (e) => {
        if(!userInfo){
          alert("User must be logged in !");
          return;
        }
        if(title!=="")
        dispatch(submit(userInfo,title,text,problemId));
    }

    const discussionsView = discussions ? discussions.map((discussion => {
      return <Grid key={discussion._id} container>
            <Grid item xs={12} style={{padding : "1rem"}}>
              <Link target="_blank" to={`/problem/discuss/${searchTitle}/${discussion._id}`}>
                {discussion.title}
              </Link>
            </Grid>
      </Grid>
    })) : null

  return (
    <Grid
      container
      style={{ boxSizing: "border-box",padding : "1rem" }}
    >
      <Grid container item xs={12} style={{ boxSizing: "border-box", border: "1px solid black" }} >
        <Button>Newest to Oldest</Button>
        <Button>Most Votes</Button>
        <Button style={{ marginLeft: "auto" }} onClick={() => {
            setCreate(prevState => !prevState)
        }} >{create ? "X Cancel" : "+ New"}</Button>
      </Grid>
      { create && <Grid container style={{ paddingTop: "1rem"}}>
        <input
          placeholder="Title"
          value = {title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem",padding : "0.5rem", fontSize: "1rem" }}
        />

        <DiscussFormEditor id="discuss-forum" setText={setText} />
        <Button
          variant="outlined"
          style={{ marginLeft: "auto", marginTop: "1rem" }}
          onClick={discussionSubmitHandler}
          type="submit"
        >
          Post
        </Button>
      </Grid>}

        {discussionsView}

    </Grid>
  );
};

export default ProblemDiscussForum;
