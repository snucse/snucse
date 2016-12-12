import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadArticlesTag} from './';

export function loadArticles(dispatch, profileId) {
  const url = Url.getUrl('/articles', {profileId});
  DataCon.loadDataFromServer(url).then(data => {
    dispatch({
      type: types.LOAD_ARTICLES,
      articles: data.articles
    });
    return data.articles;
  }).then(articles => {
    loadArticlesTag(dispatch, articles);
  }).catch(console.error);
}

export function scrollArticleListEnd(dispatch) {
  dispatch({
    type: types.SCROLL_ARTICLE_LIST_END
  });
}

export function onLoadArticle(dispatch, articleNum, renderedArticleNum) {
  dispatch({
    type: types.ON_LOADING_ARTICLE
  });
  // TODO: promise?
  setTimeout(() => {
    if (articleNum > renderedArticleNum) {
      scrollArticleListEnd(dispatch);
    }
  }, 1000);
}
