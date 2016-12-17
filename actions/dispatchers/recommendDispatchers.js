import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {updateSingleFeed} from '.';

export function recommendArticle(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/articles/${id}/recommend`), 'POST').then(article => {
    updateSingleFeed(dispatch, {...article, type: 'article'});
  }).catch(console.error);
}

export function recommendComment(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${id}/recommend`), 'POST').then(comment => {
    dispatch({
      type: types.EDIT_COMMENT,
      articleId: comment.articleId,
      comment
    });
  }).catch(console.error);
}

export function recommendProfileComment(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/profile_comments/${id}/recommend`), 'POST').then(comment => {
    dispatch({
      type: types.EDIT_PROFILE_COMMENT,
      profileId: comment.profileId,
      comment
    });
  }).catch(console.error);
}
