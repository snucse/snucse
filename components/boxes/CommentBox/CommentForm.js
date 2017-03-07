import React from 'react';
import {genRefCallback} from '../../../utils';

const CommentForm = React.createClass({

  propTypes: {
    onWrite: React.PropTypes.func.isRequired
  },

  handleSubmit(event) {
    event.preventDefault();
    if ((this._content || false) && this._content.value !== '') {
      this.props.onWrite(this._content.value);
      this._content.value = '';
    }
  },

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <div className="comment-input-container">
          <input className="comment-input" ref={genRefCallback(this, '_content')}/>
        </div>
        <button className="comment-submit-button">확인</button>
      </form>
    );
  }
});

export default CommentForm;
