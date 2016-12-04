import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadArticlesTag} from './';

export function loadFeed(dispatch, options) {
  const limit = (options && options.limit) || 5;
  const maxId = options && options.maxId;
  const sinceId = options && options.sinceId;
  const params = {
    maxId,
    sinceId,
    limit
  };
  const url = Url.getUrl('/feeds', params);
  DataCon.postDataToServer(url).then(data => {
    const moreDataPresent = (data.feeds.length >= limit);
    dispatch({
      type: types.LOAD_FEED,
      feeds: data.feeds,
      reset: (options == null),
      maxId,
      sinceId,
      moreDataPresent
    });
    return data.feeds;
  }).then(feeds => {
    const articles = feeds.filter(item => item.type === 'article');
    loadArticlesTag(dispatch, articles);
  }).catch(console.error);
}
