import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import '../../stylesheets/search-form.styl';
import {genRefCallback, connectModals} from '../../utils';

const SearchForm = React.createClass({
  propTypes: {
    previousCategory: React.PropTypes.string
  },

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
    const category = /* value from form || */this.props.previousCategory;
    const params = {query, category};
    const paramsString = Object.keys(params).filter(key => {
      return params[key] !== undefined && params[key] !== null;
    }).map(key => {
      return `${key}=${params[key]}`;
    }).join('&');
    // todo extract to util
    this.props.search(paramsString);
  },

  render() {
    // add other inputs (ex) select tag for category
    // condition boxes will be enabled by its props
    return (
      <form id="search-form" onSubmit={this.handleSubmit}>
        <input id="search-form-input" ref={genRefCallback(this, '_content')} name="query" placeholder="키워드로 검색하실 수 있습니다"/>
        <button id="search-form-button">검색</button>
      </form>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    search: paramsString => dispatch(push(`/search?${paramsString}`))
  };
};

export default connectModals(connect(null, mapDispatchToProps)(SearchForm));
