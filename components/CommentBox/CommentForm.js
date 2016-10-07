import React from 'react';

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
    const generateRefHandler = propertyName => {
      return ref => {
        this[propertyName] = ref;
      };
    };
    // button 모양이지만 onsubmit 이벤트를 일으키지 않기 위해 input type button을 사용함
    return (
      <form className="comment-form" ref={generateRefHandler('refForm')}>
        <input ref={generateRefHandler('_content')}/>
        <input onClick={this.handleClickWrite} type="button" value="확인"/>
      </form>
    );
  }
});

export default CommentForm;
