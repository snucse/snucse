import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

import Realtime from '../Realtime';

export const ArticleSearchResult = React.createClass({
  render() {
    const {profiles, id, title, content, writer, createdAt} = this.props.article;
    const primaryProfile = profiles[0];
    moment.locale('ko');
    const date = moment(createdAt);
    return (
      <article className="search-item article-search-item">
        <Link to={`/${id}`}>{`${title}`}</Link>
        <time title={date.format('LLL')}>
          <Realtime from={date}/>
        </time>
        <br/>
        <p>{content.substring(0, 200)} {content.length > 200 ? '...' : ''}</p>
        <Link to={`/${primaryProfile.id}`}>{primaryProfile.name}</Link> | <Link to={`/${writer.username}`}>{`${writer.name}`}</Link>
      </article>
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
    const {profile} = this.props;
    const {name, description, id} = profile;
    return (
      <article className="search-item profile-search-item">
        <Link to={`/${id}`}>{name}</Link>
        <p>{description}</p>
      </article>
    );
  }
});

export const TagSearchResult = React.createClass({
  render() {
    const {tag} = this.props.tag;
    return (
      <article className="search-item tag-search-item">
        <Link to={{pathname: '/tags', search: '?' + queryString.stringify({tag})}}>{tag}</Link>
      </article>
    );
  }
});
