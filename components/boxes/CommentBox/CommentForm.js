import React from 'react';
import classnames from 'classnames';

import {genRefCallback} from '../../../utils';

const CommentForm = React.createClass({

  propTypes: {
    onWrite: React.PropTypes.func.isRequired,
    isChild: React.PropTypes.bool
  },

  handleSubmit(event) {
    event.preventDefault();
    if ((this._content || false) && this._content.value !== '') {
      this.props.onWrite(this._content.value);
      this._content.value = '';
    }
  },

  render() {
    const clazz = classnames('comment-form', {
      'reply-form': this.props.isChild
    });
    return (
      <form className={clazz} onSubmit={this.handleSubmit}>
        <div className="comment-input-container">
          <input className="comment-input" ref={genRefCallback(this, '_content')}/>
        </div>
        <button className="comment-submit-button">확인</button>
      </form>
    );
  }
});

export default CommentForm;
