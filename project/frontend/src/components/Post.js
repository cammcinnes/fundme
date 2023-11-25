import React, { useState } from 'react';
import Comment from './Comment';

function Post({ postData }) {
  const URL = process.env.REACT_APP_URL;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const toggleComments = async () => {
    if (!showComments) {
      const response = await fetch(`${URL}/posts/comment/${postData[0]}`);
      const parsedResponse = await response.json();
      if (parsedResponse.success === true) {
        setComments(parsedResponse.result.comments);
      } else {
        alert("Error getting comments: " + parsedResponse.error);
      }
    } else {
      setComments([]);
    }
    setShowComments(!showComments);
  }

  const deletePost = async () => {
    const response = await fetch(`${URL}/posts/${postData[0]}`, {
      method: 'DELETE',
      headers: { token: localStorage.getItem("token") }
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if (parsedResponse.success === true) {
      alert("Successfully deleted post and comments!");
      window.location.reload(false);
    } else {
      alert("Unable to delete post: " + parsedResponse.error);
    }
  }

  // show timestamp, image
  return (
    <div className="post">
      <div className="post-top">
        <h6>Posted at: {postData[3]}</h6>
        <button onClick={deletePost}>Delete post</button>
      </div>
      <p>{ postData[1] }</p>
      { postData[2] && <img src={postData[2]} /> }
      <button onClick={toggleComments}>{!showComments ? "Show Comments" : "Hide Comments" }</button>
      { showComments && (
        <div>
          { comments.length < 1 ? "No comments" : 
            comments.map((comment) => (
              <Comment key={comment[0]} commentData={comment}/>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Post;
