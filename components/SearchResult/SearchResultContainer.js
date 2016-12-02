import React from 'react';
import {connect} from 'react-redux';

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
    if (props.location.query.query !== this.props.location.query.query ||
      props.location.query.category !== this.props.location.query.category ||
      props.location.query.page !== this.props.location.query.page) {
      // fixme 더 좋은 방법 없나, obj 째로 비교하는
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
