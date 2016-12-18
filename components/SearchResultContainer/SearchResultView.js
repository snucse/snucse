import React from 'react';

import OverallSearchResultView from './OverallSearchResultView';
import ArticleSearchResultView from './ArticleSearchResultView';
import CommentSearchResultView from './CommentSearchResultView';
import ProfileSearchResultView from './ProfileSearchResultView';
import TagSearchResultView from './TagSearchResultView';

const SearchResultView = React.createClass({
  render() {
    const {category} = this.props;
    let SearchView;
    switch (category) {
      case 'article': {
        SearchView = <ArticleSearchResultView query={this.props.query} page={this.props.page} result={this.props.result}/>;
      } break;
      case 'comment': {
        SearchView = <CommentSearchResultView query={this.props.query} page={this.props.page} result={this.props.result}/>;
      } break;
      case 'profile': {
        SearchView = <ProfileSearchResultView query={this.props.query} page={this.props.page} result={this.props.result}/>;
      } break;
      case 'tag': {
        SearchView = <TagSearchResultView query={this.props.query} page={this.props.page} result={this.props.result}/>;
      } break;
      default: {
        SearchView = <OverallSearchResultView query={this.props.query} page={this.props.page} result={this.props.result}/>;
      } break;
    }
    return SearchView;
  }
});

export default SearchResultView;
