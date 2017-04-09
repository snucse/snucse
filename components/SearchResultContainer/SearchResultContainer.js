import React from 'react';
import {connect} from 'react-redux';
import isEqual from 'deep-equal';
import queryString from 'query-string';

import {loadSearchResult} from '../../actions/dispatchers';
import SearchResultView from './SearchResultView';

const SearchResultContainer = React.createClass({
  loadSearchResult(query) {
    this.props.loadSearchResult(query.query, query.category, (Number(query.page) || 0) + 1, query.num);
  },

  componentDidMount() {
    this.loadSearchResult(queryString.parse(this.props.location.search));
  },

  componentWillReceiveProps(props) {
    const oldQ = queryString.parse(this.props.location.search);
    const newQ = queryString.parse(props.location.search);
    if (!isEqual(oldQ, newQ)) {
      window.scrollTo(0, 0);
      this.loadSearchResult(newQ);
    }
  },

  render() {
    const {result} = this.props;
    const {category, query, page} = queryString.parse(this.props.location.search);
    return <SearchResultView category={category} query={query} page={page} result={result}/>;
  }
});

const mapStateToProps = function (state) {
  return {
    result: state.search
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadSearchResult: (query, category, page, num) => loadSearchResult(dispatch, query, category, page, num)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultContainer);
