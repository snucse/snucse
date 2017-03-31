import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {loadArticleTag} from './tagDispatchers';

export function loadArticle(dispatch, articleId) {
  dispatch({
    type: types.CLEAR_ARTICLE_VIEW
  });
  DataCon.loadDataFromServer(Url.getUrl(`/articles/${articleId}`)).then(article => {
    dispatch({
      type: types.LOAD_ARTICLE,
      article,
      isError: false
    });
    return article;
  }).then(article => {
    loadArticleTag(dispatch, article);
  }).catch(err => {
    console.error(err);
    dispatch({
      type: types.LOAD_ARTICLE,
      article: null,
      isError: true
    });
  });
}
