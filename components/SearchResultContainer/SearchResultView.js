import React from 'react';

import SearchForm from './SearchForm';
import OverallSearchResultView from './OverallSearchResultView';
import ArticleSearchResultView from './ArticleSearchResultView';
import CommentSearchResultView from './CommentSearchResultView';
import ProfileSearchResultView from './ProfileSearchResultView';
import TagSearchResultView from './TagSearchResultView';

const SearchResultView = React.createClass({
  render() {
    const {category, query, page, result} = this.props;
    let SearchResultSection;
    switch (category) {
      case 'article': {
        SearchResultSection = <ArticleSearchResultView query={query} page={page} result={result}/>;
      } break;
      case 'comment': {
        SearchResultSection = <CommentSearchResultView query={query} page={page} result={result}/>;
      } break;
      case 'profile': {
        SearchResultSection = <ProfileSearchResultView query={query} page={page} result={result}/>;
      } break;
      case 'tag': {
        SearchResultSection = <TagSearchResultView query={query} page={page} result={result}/>;
      } break;
      default: {
        SearchResultSection = <OverallSearchResultView query={query} page={page} result={result}/>;
      } break;
    }
    return (
      <div>
        <SearchForm previousCategory={category}/>
        <div id="search-result-container">
          <h4 id="search-result-title">{`'${query}'`} 검색 결과</h4>
          {SearchResultSection}
        </div>
      </div>
    );
  }
});

export default SearchResultView;
