import React from 'react';

import {SearchResultTagBox} from '../boxes';
import SearchResultLinks from './SearchResultLinks';

const TagSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const page = Number(this.props.page) || 0;
    const num = Number(this.props.num) || 10;
    return (
      <section id="search-result-tag">
        <h4 id="search-result-tag-title">태그</h4>
        <SearchResultTagBox searchResultTags={result.tags.data}/>
        <footer>
          <SearchResultLinks category={'tag'} query={query} page={page} num={num} count={result.tags.count}/>
        </footer>
      </section>
    );
  }
});

export default TagSearchResultView;
