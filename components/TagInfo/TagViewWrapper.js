import React from 'react';
import {Link} from 'react-router';

import '../../stylesheets/taginfo.styl';
import {RelatedTagBox} from '../boxes';

const TagEmptyView = React.createClass({
  render() {
    return (
      <p>
        Tag {this.props.tagName} not found.
      </p>
    );
  }
});

const TagView = React.createClass({
  render() {
    const {creator, articles, profiles, relatedTags} = this.props.tag;
    const articlesView = articles.length === 0 ?
      <li id="tag-info-article-empty">관련 글이 없습니다.</li> :
      articles.map(article => {
        return (
          <li key={article.id} className="tag-info-article-container">
            <div className="tag-info-article">
              <div className="tag-info-article-writer-container">
                <img className="tag-info-article-writer-image" src={article.writer.profileImageUri}/>
                <h5 className="tag-info-article-writer-name">{article.writer.name}</h5>
              </div>
              <div className="tag-info-article-main">
                <small className="tag-info-article-date">{article.createdAt.date} {article.createdAt.time}</small>
                <h5 className="tag-info-article-title"><Link to={`/${article.id}`}>{article.title}</Link></h5>
                <span className="tag-info-article-profiles">{article.profiles[0].name}</span>
                <div className="tag-info-article-content">
                  {article.content}
                </div>
              </div>
            </div>
          </li>
        );
      });
    const profilesView = profiles.length === 0 ?
      <li id="tag-info-profile-empty">관련 프로필이 없습니다.</li> :
      profiles.map(profile => {
        return (
          <li key={profile.id} className="tag-info-profile-container">
            <div className="tag-info-profile">
              <h5 className="tag-info-profile-name"><Link to={`/${profile.id}`}>{profile.name}</Link></h5>
              <div className="tag-info-profile-description">
                {profile.description}
              </div>
            </div>
          </li>
        );
      });
    return (
      <div id="tag-info-container">
        <h3 id="tag-title">{this.props.tagName}<small id="tag-title-description">만든이 <Link id="tag-creator-name" to={`/${creator.username}`}>{creator.name}</Link></small></h3>
        <h4 id="tag-info-related-tag-title">연관 태그</h4>
        <section>
          <RelatedTagBox targetTagName={this.props.tagName} relatedTags={relatedTags}/>
        </section>
        <h4 id="tag-info-article-title">관련 글</h4>
        <ul id="tag-info-article-list">
          {articlesView}
        </ul>
        <h4 id="tag-info-profile-title">관련 프로필</h4>
        <ul id="tag-info-profile-list">
          {profilesView}
        </ul>
      </div>
    );
  }
});

const TagViewWrapper = React.createClass({
  render() {
    const tag = this.props.tag;
    let view;
    if (tag === null) {
      view = <TagEmptyView tagName={this.props.tagName}/>;
    } else {
      view = <TagView tagName={this.props.tagName} tag={tag}/>;
    }
    return (
      <div className="tag-view-wrapper">
        {view}
      </div>
    );
  }
});

export default TagViewWrapper;
