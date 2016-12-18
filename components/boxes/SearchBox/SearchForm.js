import React from 'react';
import {browserHistory} from 'react-router';

import {genRefCallback} from '../../../utils';

export default React.createClass({
  handleKeyDown(event) {
    if (event.keyCode == 13) {
      this.handleSearch();
      event.preventDefault();
    }
  },

  handleClickSearchButton() {
    this.handleSearch();
  },

  handleSearch() {
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
      <form>
        <input onKeyDown={this.handleKeyDown} ref={genRefCallback(this, '_content')} name="query"/>
        <input onClick={this.handleClickSearchButton} type="button" value="검색"/>
      </form>
    );
  }
});
