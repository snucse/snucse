import React from 'react';
// import moment from 'moment';

export const ArticleSearchResult = React.createClass({
  render() {
    const {article} = this.props;
    const {title, writer, createdAt} = article;
    return (
      <article>
        {JSON.stringify(this.props.article)}<br/>
        {`${title} (to article) - ${writer.name} (to profile)`}
        <time>{JSON.stringify(createdAt)}</time>
        <br/>
        글 내용 대충
      </article>
    );
  }
});

export const CommentSearchResult = React.createClass({
  render() {
    // const {comment} = this.props;
    // const {title, writer, createdAt} = article;
    return (
      <article>
        {JSON.stringify(this.props.comment)}<br/>
        <br/>
        댓글 내용 대충
      </article>
    );
  }
});

export const ProfileSearchResult = React.createClass({
  render() {
    // const {article} = this.props;
    // const {title, writer, createdAt} = article;
    return (
      <article>
        {JSON.stringify(this.props.profile)}<br/>
        <br/>
        프로필 (to profile)
      </article>
    );
  }
});

export const TagSearchResult = React.createClass({
  render() {
    // const {tag} = this.props;
    // const {title, writer, createdAt} = article;
    return (
      <article>
        {JSON.stringify(this.props.tag)}<br/>
        <br/>
        태그 결과? (to tag)
      </article>
    );
  }
});
