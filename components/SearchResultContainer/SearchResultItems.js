import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import Realtime from '../Realtime';

export const ArticleSearchResult = React.createClass({
  render() {
    const {profiles, id, title, content, writer, createdAt} = this.props.article;
    const primaryProfile = profiles[0];
    moment.locale('ko');
    const date = moment(createdAt);
    return (
      <li className="search-result-article-container">
        <div className="search-result-article">
          <small className="search-result-article-date" title={date.format('LLL')}>
            <Realtime from={date}/>
          </small>
          <h5 className="search-result-article-header"><Link className="search-result-article-title" to={`/${id}`}>{title}</Link><span className="search-result-article-profiles">{primaryProfile.name}</span></h5>
          <div className="search-result-article-writer-container">
            <img className="search-result-article-writer-image" src={writer.profileImageUri}/>
            <h5 className="search-result-article-writer-name"><Link to={`/${writer.username}`}>{writer.name}</Link></h5>
          </div>
          <div className="search-result-article-main">
            <div className="search-result-article-content">
              {content}
            </div>
          </div>
        </div>
      </li>
    );
  }
});

export const CommentSearchResult = React.createClass({
  render() {
    const {content, writer, createdAt, recommendationCount, article, articleId} = this.props.comment;
    const {title} = article;
    moment.locale('ko');
    const date = moment(createdAt);
    return (
      <li className="search-result-comment-container">
        <div className="search-result-comment">
          <div className="search-result-comment-content">
            {content}
          </div>
          <div className="search-result-comment-info">
            <div className="search-result-comment-recommendation-count">{recommendationCount}</div>
            <div className="search-result-comment-writer">{writer.name}</div>
            <small className="search-result-comment-date" title={date.format('LLL')}>
              <Realtime from={date}/>
            </small>
          </div>
          <div className="search-result-comment-article">
            <Link className="search-result-comment-article-link" to={`/${articleId}`}>{title}</Link>
          </div>
        </div>
      </li>
    );
  }
});

export const ProfileSearchResult = React.createClass({
  render() {
    const {name, description, id} = this.props.profile;
    return (
      <li className="search-result-profile-container">
        <div className="search-result-profile">
          <h5 className="search-result-profile-name"><Link to={`/${id}`}>{name}</Link></h5>
          <div className="search-result-profile-description">
            {description}
          </div>
        </div>
      </li>
    );
  }
});

export const TagSearchResult = React.createClass({
  render() {
    const {tag} = this.props.tag;
    return (
      <article className="search-item tag-search-item">
        <Link to={{pathname: '/tags', query: {tag}}}>{tag}</Link>
      </article>
    );
  }
});
