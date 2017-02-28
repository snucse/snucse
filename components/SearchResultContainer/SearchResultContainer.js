import React from 'react';
import {connect} from 'react-redux';
import isEqual from 'deep-equal';

import '../../stylesheets/search-result.styl';
import {loadSearchResult} from '../../actions/dispatchers';
import SearchResultView from './SearchResultView';

const SearchResultContainer = React.createClass({
  loadSearchResult(query) {
    this.props.loadSearchResult(query.query, query.category, (Number(query.page) || 0) + 1, query.num);
  },

  componentDidMount() {
    this.loadSearchResult(this.props.location.query);
  },

  componentWillReceiveProps(props) {
    if (!isEqual(props.location.query, this.props.location.query)) {
      window.scrollTo(0, 0);
      this.loadSearchResult(props.location.query);
    }
  },

  render() {
    const {result} = this.props;
    const {category, query, page} = this.props.location.query;
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
