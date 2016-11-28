import React from 'react';
import {Link} from 'react-router';

import {TagSearchResult} from './SearchResultItems';

const TagSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
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
            <span><Link to={`/search?category=tag&query=${query}`}>더보기</Link> (총 개수?)</span>
          </footer>
        </section>
        <p>
          {'0, 1, 2, 3, 4, 5, 6, 7, 8, 9 > 임시'}
        </p>
      </section>
    );
  }
});

export default TagSearchResultView;
