import React from 'react';
import {browserHistory} from 'react-router';

import {genRefCallback} from '../../../utils';

export default React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    // this.props.onSearch(this._content.value);
    /*
      onSearch parameter order
      - query
      - category (article, profile, tag, etc.)
      - type (article: title, content, writer, etc., profile: title, tag: content)
      - other condition
    */
    const query = this._content.value;
    if (query.length < 2) {
      alert('두 글자 이상 입력해주세요');
      return;
    }
    browserHistory.push(`/search?query=${query}`);
  },

  render() {
    // add other inputs (ex) select tag for category
    // condition boxes will be enabled by its props
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref={genRefCallback(this, '_content')} name="query"/>
        <button>검색</button>
      </form>
    );
  }
});
