import React from 'react';
import {connect} from 'react-redux';

import {DataCon, Url} from '../utils';
import {loadFeed, updateSingleFeed, updateTimes} from '../actions/dispatchers';
import FeedList from './FeedList';
import ArticleWrite from './ArticleWrite';

const Feed = React.createClass({
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadFeed({profileId: this.props.profileId});
  },

  componentWillReceiveProps(props) {
    if (props.profileId !== this.props.profileId) {
      window.scrollTo(0, 0);
      props.loadFeed({profileId: props.profileId});
    }
  },

  handleLoadMore(options) {
    this.props.loadFeed({...options, profileId: this.props.profileId});
    this.props.updateTimes();
  },

  handleArticleSubmit(data) {
    const url = Url.getUrl('/articles');
    DataCon.postFormDataToServer(url, 'POST', data)
      .then(article => {
        this.props.loadFeed({
          sinceId: article.id - 1,
          maxId: article.id,
          profileId: this.props.profileId
        });
      }).catch(console.error);
  },

  handleArticleDelete(articleId) {
    const url = Url.getUrl(`/articles/${articleId}`);
    DataCon.postDataToServer(url, 'DELETE')
      .then(() => {
        this.props.updateSingleFeed({id: articleId});
      }).catch(console.error);
  },

  render() {
    const {byId, allIds, loadMore, resetLoading} = this.props;
    const refreshSince = (allIds.length > 0 ? allIds[0] : undefined);

    // O(n + m)
    const rawFeeds = allIds.map(id => byId[id]);
    const feedLoadMore = loadMore.map(metadata => {
      return {
        id: metadata.maxId + 1,
        type: 'loadmore',
        options: metadata
      };
    });
    // 리셋 중이 아니면 첫 번째 항목은 리프레시 버튼
    const startPos = resetLoading ? 0 : 1;
    const feeds = new Array(rawFeeds.length + feedLoadMore.length + startPos);
    if (!resetLoading) {
      feeds[0] = {
        id: 'refresh',
        type: 'loadmore',
        options: {
          sinceId: refreshSince,
          limit: 5
        }
      };
    }
    // 두 리스트가 모두 정렬되어 있으므로 merge
    // O(n + m)
    let i = 0;
    let j = 0;
    for (let p = startPos; p < feeds.length; p++) {
      if (i >= rawFeeds.length) {
        feeds[p] = feedLoadMore[j++];
      } else if (j >= feedLoadMore.length) {
        feeds[p] = rawFeeds[i++];
      } else {
        // 양쪽의 id가 같으면 피드 항목이 우선됨
        feeds[p] = (rawFeeds[i].id >= feedLoadMore[j].id) ? rawFeeds[i++] : feedLoadMore[j++];
      }
    }
    // total O(n + m)

    const articleWrite = this.props.profileId ? <ArticleWrite id={this.props.profileId} onArticleSubmit={this.handleArticleSubmit}/> : null;

    return (
      <div className="feed">
        {articleWrite}
        <FeedList feeds={feeds} onLoadMore={this.handleLoadMore} onArticleDelete={this.handleArticleDelete}/>
      </div>
    );
  }
});

const mapStateToProps = function (state) {
  return {...state.feeds};
};

const mapDispatchToProps = function (dispatch) {
  return {
    loadFeed: options => loadFeed(dispatch, options),
    updateSingleFeed: feed => updateSingleFeed(dispatch, feed),
    updateTimes: () => updateTimes(dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
