import React from 'react';
import {Link} from 'react-router';

import {ArticleSearchResult, CommentSearchResult, ProfileSearchResult, TagSearchResult} from './SearchResultItems';

const OverallSearchResultView = React.createClass({
  render() {
    const {query, result} = this.props;
    const articleResults = result.articles.data.map(article => {
      return <ArticleSearchResult article={article} key={`${query}-${article.id}`}/>;
    });
    const commentResults = result.comments.data.map(comment => {
      return <CommentSearchResult comment={comment} key={`${query}-${comment.id}`}/>;
    });
    const profileResults = result.profiles.data.map(profile => {
      return <ProfileSearchResult profile={profile} key={`${query}-${profile.id}`}/>;
    });
    const tagResults = result.tags.data.map(tag => {
      return <TagSearchResult tag={tag} key={`${query}-${tag.tag}`}/>;
    });
    return (
      <section>
        <h3>{`'${query}'`} 검색 결과</h3>
        <form>서치 폼</form>
        <section>
          <header>
            <h4>글</h4>
          </header>
          {articleResults}
          <footer>
            <span><Link to={`/search?category=article&query=${query}`}>더보기</Link> ({result.articles.count})</span>
          </footer>
        </section>
        <section>
          <h4>댓글</h4>
          {commentResults}
          <footer>
            <span><Link to={`/search?category=comment&query=${query}`}>더보기</Link> ({result.comments.count})</span>
          </footer>
        </section>
        <section>
          <h4>프로필</h4>
          {profileResults}
          <footer>
            <span><Link to={`/search?category=profile&query=${query}`}>더보기</Link> ({result.profiles.count})</span>
          </footer>
        </section>
        <section>
          <h4>태그</h4>
          {tagResults}
          <footer>
            <span><Link to={`/search?category=tag&query=${query}`}>더보기</Link> ({result.tags.count})</span>
          </footer>
        </section>
      </section>
    );
  }
});

export default OverallSearchResultView;
