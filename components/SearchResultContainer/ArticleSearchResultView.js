import React from 'react';

import {ArticleSearchResult} from './SearchResultItems';
import SearchResultLinks from './SearchResultLinks';

const ArticleSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const page = Number(this.props.page) || 0;
    const num = Number(this.props.num) || 10;
    const articleResults = result.articles.data.map(article => {
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
          <ul id="tag-info-article-list">
            {articleResults}
          </ul>
          <footer>
            <SearchResultLinks category={'article'} query={query} page={page} num={num} count={result.articles.count}/>
          </footer>
        </section>
      </section>
    );
  }
});

export default ArticleSearchResultView;
