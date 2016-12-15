import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function recommendArticle(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/articles/${id}/recommend`), 'POST').then(article => {
    dispatch({
      type: types.TODO,
      article
    });
  }).catch(console.error);
}

export function recommendComment(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${id}/recommend`), 'POST').then(comment => {
    dispatch({
      type: types.TODO,
      comment
    });
  }).catch(console.error);
}
