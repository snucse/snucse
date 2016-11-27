import React from 'react';
import {Link} from 'react-router';

import {ArticleSearchResult} from './SearchResultItems';

const ArticleSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const articleResults = result.articles.map(article => {
      return <ArticleSearchResult article={article} key={`${query}-${article.id}`}/>;
    });
    return (
      <section>
        <h3>{`'${query}'`} 게시판 검색 결과</h3>
        <form>서치 폼</form>
        <section>
          <header>
            <h4>글</h4>
          </header>
          {articleResults}
          <footer>
            <span><Link to={`/search?category=article&query=${query}`}>더보기</Link> (총 개수?)</span>
          </footer>
        </section>
        <p>
          {'0, 1, 2, 3, 4, 5, 6, 7, 8, 9 > 임시'}
        </p>
      </section>
    );
  }
});

export default ArticleSearchResultView;
