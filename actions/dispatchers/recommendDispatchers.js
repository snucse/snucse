import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {updateSingleFeed, alertModal} from '.';

export function recommendArticle(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/articles/${id}/recommend`), 'POST').then(article => {
    updateSingleFeed(dispatch, {...article, type: 'article'});
    dispatch({
      type: types.LOAD_ARTICLE,
      article,
      isError: false
    });
  }).catch(err => {
    if (err.status === 400) {
      alertModal(dispatch, '알림', '이미 추천하셨습니다. 추천은 하루에 한번만 가능합니다.');
    } else {
      console.error(err);
    }
  });
}

export function recommendComment(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${id}/recommend`), 'POST').then(comment => {
    dispatch({
      type: types.EDIT_COMMENT,
      articleId: comment.articleId,
      comment
    });
  }).catch(err => {
    if (err.status === 400) {
      alertModal(dispatch, '알림', '이미 추천하셨습니다. 추천은 하루에 한번만 가능합니다.');
    } else {
      console.error(err);
    }
  });
}

export function recommendProfileComment(dispatch, id) {
  DataCon.postDataToServer(Url.getUrl(`/profile_comments/${id}/recommend`), 'POST').then(comment => {
    dispatch({
      type: types.EDIT_PROFILE_COMMENT,
      profileId: comment.profileId,
      comment
    });
  }).catch(err => {
    if (err.status === 400) {
      alertModal(dispatch, '알림', '이미 추천하셨습니다. 추천은 하루에 한번만 가능합니다.');
    } else {
      console.error(err);
    }
  });
}
