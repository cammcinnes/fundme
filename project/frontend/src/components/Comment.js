import React from 'react';

function Post({ commentData }) {
  return (
    <div className="comment">
      <span>@{commentData[3]} {commentData[1]} wrote:</span>
      <div>{commentData[2]}</div>
    </div>
  );
};

export default Post;
