import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadArticlesTag} from './';

export function loadFeed(dispatch, options) {
  const limit = (options && options.limit) || 5;
  const maxId = options && options.maxId;
  const sinceId = options && options.sinceId;
  const profileId = (options && options.profileId) || undefined;
  const params = {
    maxId,
    sinceId,
    limit,
    profileId
  };
  const reset = (maxId == null && sinceId == null);
  if (reset) {
    dispatch({
      type: types.LOAD_FEED_RESET
    });
  }

  // options.profileId가 있으면 프로필 글 목록을 불러옴
  const endpoint = profileId ? 'articles' : 'feeds';
  const url = Url.getUrl(`/${endpoint}`, params);
  DataCon.loadDataFromServer(url).then(data => {
    // 프로필 글 목록이라면 type: 'article'을 추가함
    const feeds = profileId ? data.articles.map(item => {
      return {...item, type: 'article'};
    }) : data.feeds;

    const automatic = Boolean(options && options.automatic);
    const moreDataPresent = (feeds.length >= limit);
    dispatch({
      type: types.LOAD_FEED,
      feeds,
      reset,
      automatic,
      maxId,
      sinceId,
      moreDataPresent
    });
    return feeds;
  }).then(feeds => {
    const articles = feeds.filter(item => item.type === 'article');
    loadArticlesTag(dispatch, articles, reset);
  }).catch(console.error);
}

export function updateSingleFeed(dispatch, feed) {
  dispatch({
    type: types.UPDATE_SINGLE_FEED,
    feed
  });
}
