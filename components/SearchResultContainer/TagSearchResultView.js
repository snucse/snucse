import React from 'react';

import {TagSearchResult} from './SearchResultItems';
import SearchResultLinks from './SearchResultLinks';

const TagSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const page = Number(this.props.page) || 0;
    const num = Number(this.props.num) || 10;
    const tagResults = result.tags.data.map(tag => {
      return <TagSearchResult tag={tag} key={`${query}-${tag.tag}`}/>;
    });
    return (
      <section>
        <h3>{`'${query}'`} 태그 검색 결과</h3>
        <form>서치 폼</form>
        <section>
          <h4>태그</h4>
          {tagResults}
          <footer>
            <SearchResultLinks category={'tag'} query={query} page={page} num={num} count={result.tags.count}/>
          </footer>
        </section>
      </section>
    );
  }
});

export default TagSearchResultView;
