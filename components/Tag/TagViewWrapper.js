import React from 'react';
import {Link} from 'react-router';

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
    const {creator, articles, profiles} = this.props.tag;
    const articlesView = articles.length === 0 ?
      <tr>
        <td colSpan={4}>관련 글이 없습니다.</td>
      </tr> :
      articles.map(article => {
        return (
          <tr key={article.id}>
            <td>{article.title}</td>
            <td>{article.writer.name} ({article.writer.username})</td>
            <td>{article.profiles[0].name}</td>
            <td>{article.createdAt.date} {article.createdAt.time}</td>
          </tr>
        );
      });
    const profilesView = profiles.length === 0 ?
      <tr>
        <td colSpan={1}>관련 프로필이 없습니다.</td>
      </tr> :
      profiles.map(profile => {
        return (
          <tr key={profile.id}>
            <td><Link to={`/${profile.id}`}>{profile.name}</Link></td>
          </tr>
        );
      });
    return (
      <div>
        <h3>{this.props.tagName}</h3>
        <p>
          <img src={creator.profileImageUrl}/>
          태그 만든 사람 {creator.name}
        </p>
        <h4>관련 글</h4>
        <section>
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>프로필</th>
                <th>작성시간</th>
              </tr>
            </thead>
            <tbody>
              {articlesView}
            </tbody>
          </table>
        </section>
        <h4>관련 프로필</h4>
        <section>
          <table>
            <thead>
              <tr>
                <th>이름</th>
              </tr>
            </thead>
            <tbody>
              {profilesView}
            </tbody>
          </table>
        </section>
      </div>
    );
    // fixme user page link 만들기
    // fixme article page link 만들기
    // fixme css flex 쓰세요
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
