import React from 'react';

const Comments = props => {
  return (
    <div className={'col s12 m6'}>
      <div className="comments__comment">
        <div className="comments__comment-author">
          <i className="material-icons comments__comment-icon">face</i>
          <span className="comments__comment-text">{props.comment.firstName}</span>
        </div>
        <div className="comments__comment-message">
          {props.comment.message}
        </div>
      </div>
    </div>
  )
}

export default Comments