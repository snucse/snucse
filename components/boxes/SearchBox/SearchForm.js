import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {genRefCallback} from '../../../utils';
import {alertModal} from '../../../actions/dispatchers';

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
      <form onSubmit={this.handleSubmit}>
        <input ref={genRefCallback(this, '_content')} name="query"/>
        <button>검색</button>
      </form>
    );
  }
});

const mapDispatchToProps = function (dispatch) {
  return {
    alertModal: (title, message, callback) => alertModal(dispatch, title, message, callback)
  };
};

export default connect(null, mapDispatchToProps)(SearchForm);
