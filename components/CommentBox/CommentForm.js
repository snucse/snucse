import React from 'react';
import {genRefCallback} from '../../utils';

/*
  props
  - onWrite

  state
  - content
*/
const CommentForm = React.createClass({
  handleClickWrite() {
    if ((this._content || false) && this._content.value !== '') {
      this.props.onWrite(this._content.value);
      this._content.value = '';
    }
  },

  render() {
    // button 모양이지만 onsubmit 이벤트를 일으키지 않기 위해 input type button을 사용함
    return (
      <form className="comment-form" ref={genRefCallback(this, 'refForm')}>
        <input ref={genRefCallback(this, '_content')}/>
        <input onClick={this.handleClickWrite} type="button" value="확인"/>
      </form>
    );
  }
});

export default CommentForm;
