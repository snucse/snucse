import {DataCon, Url} from '../../utils';
// import * as types from '../actionTypes';
// load article tag

export function loadArticle(dispatch, articleId) {
  DataCon.loadDataFromServer(Url.getUrl(`/articles/${articleId}`)).then(article => {
    console.log(article);
  }).catch(console.error);
}
