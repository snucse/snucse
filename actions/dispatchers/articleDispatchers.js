import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadArticle(dispatch, articleId) {
  DataCon.loadDataFromServer(Url.getUrl(`/articles/${articleId}`)).then(article => {
    dispatch({
      type: types.LOAD_ARTICLE,
      article
    });
  }).catch(console.error);
}
