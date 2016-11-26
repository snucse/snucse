import React from 'react';

import OverallSearchResultView from './OverallSearchResultView';

const SearchResultView = React.createClass({
  render() {
    const {category} = this.props;
    let SearchView;
    switch (category) {
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
        SearchView = <OverallSearchResultView query={this.props.query} result={this.props.result}/>;
      } break;
    }
    SearchView = <OverallSearchResultView query={this.props.query} result={this.props.result}/>;
    // fixme erase this
    return SearchView;
  }
});

export default SearchResultView;
