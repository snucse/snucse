import React from 'react';
import {connect} from 'react-redux';

import {loadSearchResult} from '../../actions/dispatchers';
import SearchResultView from './SearchResultView';

const SearchResultContainer = React.createClass({
  loadSearchResult(query) {
    this.props.loadSearchResult(query.query, query.category, query.page, query.num);
  },

  componentDidMount() {
    this.loadSearchResult(this.props.location.query);
  },

  componentWillReceiveProps(props) {
    if (props.location.query.query !== this.props.location.query.query ||
      props.location.query.category !== this.props.location.query.category) {
      // fixme 더 좋은 방법 없나, obj 째로 비교하는
      window.scrollTo(0, 0);
      this.loadSearchResult(props.location.query);
    }
  },

  render() {
    let SearchView;
    switch (this.props.location.query.category) {
      case 'article': {
        // assign article search view
      } break;
      case 'comment': {
        // assign comment search view
      } break;
      case 'profile': {
        // assign profile search view
      } break;
      case 'tag': {
        // assign tag search view
      } break;
      default: {
        SearchView = <SearchResultView query={this.props.location.query.query} result={this.props.result}/>;
        // fixme rename overall search result view
      } break;
    }
    SearchView = <SearchResultView query={this.props.location.query.query} result={this.props.result}/>;
    // fixme erase this
    return SearchView;
    // container 로서 역할이 맞는가, result view에 category를 넘겨주고 거기서 분화해야할 듯?
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
