import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Measure from 'react-measure';
import moment from 'moment';
import classnames from 'classnames';
import BrowserDetection from 'react-browser-detection';
import {iframeResizer} from 'iframe-resizer';

import Realtime from '../Realtime';
import {FileBox, DelEditBox, ArticleTagBox, ArticleRecommendBox, ArticleCommentBox} from '../boxes';

const FeedArticle = React.createClass({
  bindIframeResizer(iframe) {
    console.log(iframe);
    function resizedCallback(args) {
      // args: {iframe,height,width,type}
      const {iframe, height} = args;
      console.log(height);
      iframe.style.height = height + 'px';
    }
    iframeResizer({
      inPageLinks: true,
      sizeHeight: true,
      resizedCallback
    }, iframe);
  },

  handleArticleDelete(articleId) {
    this.props.onArticleDelete(articleId);
  },

  handleMeasure(dimensions) {
    this.setState({dimensions});
  },

  handleEllipsisClick() {
    this.setState({loaded: true});
  },

  handleIframeLoad(event) {
    const iframe = event.target;
    const doc = iframe.contentWindow.document;
    iframe.style.height = (doc.scrollingElement || doc.body).scrollHeight + 'px';
  },

  getInitialState() {
    return {
      loaded: false,
      dimensions: {
        width: -1,
        height: -1
      }
    };
  },

  render() {
    const {article} = this.props;

    moment.locale('ko');
    const {loaded, dimensions} = this.state;
    const {height} = dimensions;
    const date = moment(article.createdAt);
    const mine = (this.props.userId === article.writer.id);
    const shrinked = !loaded && height >= 22.4 * 10;
    let ellipsis = null;
    if (height >= 22.4 * 40) {
      ellipsis = <Link to={`/${article.id}`} className="feed-article-content-ellipsis">더 보기</Link>;
    } else if (shrinked) {
      ellipsis = <span onClick={this.handleEllipsisClick} className="feed-article-content-ellipsis">더 보기</span>;
    }
    const classname = classnames({
      'article-content': true,
      'feed-article-content': true,
      'feed-article-content-shrinked': shrinked
    });
    const iframeNotSupportContentView = (
      <div
        className={classname}
        dangerouslySetInnerHTML={{__html: article.feedContent}}
        />
    );
    const defaultFeedCSS = `
      <base target="_parent">
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <link href="https://fonts.googleapis.com/earlyaccess/nanumgothic.css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="/static/reset.css">
      <link rel="stylesheet" type="text/css" href="/static/markdown.css">
      <style>
      body {
          font-family: 'Roboto', 'Nanum Gothic', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #1e3948;
      }
      </style>
    `;
    const iframeSupportContentView = (
      <div
        className={classname}
        >
        <iframe
          ref={this.bindIframeResizer}
          width="100%"
          onLoad={this.handleIframeLoad}
          sandbox={"allow-scripts allow-same-origin allow-forms allow-top-navigation"}
          srcDoc={defaultFeedCSS + article.renderedContent}
          />
      </div>
    );
    const contentViewHandler = {
      ie: () => iframeNotSupportContentView,
      edge: () => iframeNotSupportContentView,
      default: () => iframeSupportContentView
    };
    return (
      <li className="feed-article">
        <small className="article-date" title={date.format('LLL')}>
          <Realtime from={date}/>
        </small>
        <h5 className="article-title"><Link to={`/${article.id}`}>{article.title}</Link><Link to={`/${article.profiles[0].id}`} className="article-profiles">{article.profiles[0].name}</Link></h5>
        <div className="article-main">
          <div className="article-writer-container">
            <img className="article-writer-image" src={article.writer.profileImageUri}/>
            <h5 className="article-writer-name"><Link to={`/${article.writer.username}`}>{article.writer.name}</Link></h5>
          </div>
          <div className="article-divider"/>
          <div className="article-content-container">
            <FileBox files={article.files}/>
            <DelEditBox mine={mine} articleId={article.id} onArticleDelete={this.handleArticleDelete}/>
            <Measure onMeasure={this.handleMeasure}>
              <BrowserDetection once={false}>
                {contentViewHandler}
              </BrowserDetection>
            </Measure>
            {ellipsis}
          </div>
        </div>
        <ArticleRecommendBox articleId={article.id} count={article.recommendationCount}/>
        <ArticleTagBox articleId={article.id}/>
        <ArticleCommentBox
          articleId={article.id}
          lastComment={article.lastComment}
          commentCount={article.commentCount}
          isAddable
          />
      </li>
    );
  }
});

const mapStateToProps = function (state) {
  return {
    userId: state.userInfo.userId
  };
};

export default connect(mapStateToProps)(FeedArticle);
