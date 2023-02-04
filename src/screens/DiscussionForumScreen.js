import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {LinearProgress} from '@material-ui/core'

import {getDiscussion} from '../actions/discussionsForumActions'

import DiscussionForumView from '../components/ProblemDiscussForum/DiscussionForumView'

const DiscussionForumScreen = ({match}) => {

    const dispatch = useDispatch();
    const discussionGet = useSelector( state => state.discussionGet)
    const {loading, error, discussion} = discussionGet;

    useEffect(() => {
        dispatch(getDiscussion(match.params.discussionId));
    }, [])
    return (
        <div style={{paddingTop : '4rem'}}>
            {loading && <LinearProgress />}
            {discussion &&
                <>
                    <p>{`User : ${discussion.user.name}`}</p>
                    <p>{discussion.title}</p>
                    <DiscussionForumView contents={discussion.text} />
                </>
            }
        </div>
    )
}

export default DiscussionForumScreen
