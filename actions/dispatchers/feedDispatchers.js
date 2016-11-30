import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadArticlesTag} from './';

export function loadFeed(dispatch) {
  const url = Url.getUrl('/feeds');
  DataCon.loadDataFromServer(url).then(data => {
    dispatch({
      type: types.LOAD_FEED,
      feeds: data.feeds
    });
    return data.feeds;
  }).then(feeds => {
    const articles = feeds.filter(item => item.type === 'article');
    loadArticlesTag(dispatch, articles);
  }).catch(console.error);
}

export function loadMoreFeed(dispatch, feedNum, renderedFeedNum) {
  dispatch({
    type: types.LOADING_FEED_STARTED
  });
  // TODO: promise?
  setTimeout(() => {
    if (feedNum > renderedFeedNum) {
      dispatch({type: types.LOADING_FEED_FINISHED});
    }
  }, 1000);
}
