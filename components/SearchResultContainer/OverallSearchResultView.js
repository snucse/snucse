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
      <div>
        <form>서치 폼</form>
        <div id="tag-info-container">
          <h4 id="tag-title">{`'${query}'`} 검색 결과</h4>
          <section>
            <h4 id="tag-info-article-title">글</h4>
            <ul id="tag-info-article-list">
              {articleResults}
            </ul>
            <footer>
              <span><Link to={`/search?category=article&query=${query}`}>더보기</Link> ({result.articles.count})</span>
            </footer>
          </section>
          <section>
            <h4 id="tag-info-comment-title">댓글</h4>
            <ul id="tag-info-comment-lsit">
              {commentResults}
            </ul>
            <footer>
              <span><Link to={`/search?category=comment&query=${query}`}>더보기</Link> ({result.comments.count})</span>
            </footer>
          </section>
          <section>
            <h4 id="tag-info-profile-title">프로필</h4>
            <ul id="tag-info-profile-list">
              {profileResults}
            </ul>
            <footer>
              <span><Link to={`/search?category=profile&query=${query}`}>더보기</Link> ({result.profiles.count})</span>
            </footer>
          </section>
          <section>
            <h4 id="tag-info-tag-title">태그</h4>
            <ul id="tag-info-tag-container">
              {tagResults}
            </ul>
            <footer>
              <span><Link to={`/search?category=tag&query=${query}`}>더보기</Link> ({result.tags.count})</span>
            </footer>
          </section>
        </div>
      </div>
    );
  }
});

export default OverallSearchResultView;
