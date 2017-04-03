import React from 'react';
import {browserHistory} from 'react-router';

import {genRefCallback, connectModals} from '../../../utils';

const SearchForm = React.createClass({
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
      this.props.alertModal('알림', '두 글자 이상 입력해주세요');
      return;
    }
    browserHistory.push(`/search?query=${query}`);
  },

  render() {
    // add other inputs (ex) select tag for category
    // condition boxes will be enabled by its props
    return (
      <form id="search-form-top-menu" onSubmit={this.handleSubmit}>
        <input id="search-form-top-menu-input" ref={genRefCallback(this, '_content')} name="query" placeholder="SNUCSE검색"/>
      </form>
    );
  }
});

export default connectModals(SearchForm);
