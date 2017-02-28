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
      <li className="tag-info-article-container">
        <div className="tag-info-article">
          <small className="tag-info-article-date" title={date.format('LLL')}>
            <Realtime from={date}/>
          </small>
          <h5 className="tag-info-article-header"><Link className="tag-info-article-title" to={`/${id}`}>{title}</Link><span className="tag-info-article-profiles">{primaryProfile.name}</span></h5>
          <div className="tag-info-article-writer-container">
            <img className="tag-info-article-writer-image" src={writer.profileImageUri}/>
            <h5 className="tag-info-article-writer-name"><Link to={`/${writer.username}`}>{writer.name}</Link></h5>
          </div>
          <div className="tag-info-article-main">
            <div className="tag-info-article-content">
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
    // const {comment} = this.props;
    // const {title, writer, createdAt} = article;
    return (
      <article className="search-item comment-search-item">
        {JSON.stringify(this.props.comment)}<br/>
        쓴 글로 가야하는데 쓴 글에 대한 정보가 없네요
        <br/>
        #링크를 사용할까
        <br/>
      </article>
    );
  }
});

export const ProfileSearchResult = React.createClass({
  render() {
    const {name, description, id} = this.props.profile;
    return (
      <li className="tag-info-profile-container">
        <div className="tag-info-profile">
          <h5 className="tag-info-profile-name"><Link to={`/${id}`}>{name}</Link></h5>
          <div className="tag-info-profile-description">
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
