import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadComments(dispatch, articleId) {
  const url = Url.getUrl('/comments', {articleId});
  DataCon.loadDataFromServer(url).then(data => {
    dispatch({
      type: types.LOAD_COMMENTS,
      comments: data.comments,
      articleId
    });
  }).catch(console.error);
}

export function loadReplies(dispatch, parentCommentId) {
  DataCon.loadDataFromServer(Url.getUrl('/comments/replies', {parentCommentId})).then(res => {
    dispatch({
      type: types.LOAD_COMMENT_REPLIES,
      replies: res.comments,
      parentCommentId
    });
  }).catch(console.error);
}

export function setLastComment(dispatch, id, comment, commentCount, isChild = false) {
  dispatch({
    type: isChild ? types.SET_LAST_COMMENT_REPLY : types.SET_LAST_COMMENT,
    [isChild ? 'parentCommentId' : 'articleId']: id,
    comment,
    commentCount
  });
}

export function modifyFoldComments(dispatch, id, fold, isChild = false) {
  dispatch({
    type: isChild ? types.MODIFY_FOLD_COMMENT_REPLY : types.MODIFY_FOLD_COMMENT,
    [isChild ? 'parentCommentId' : 'articleId']: id,
    fold
  });
}

export function writeComment(dispatch, articleId, content, parentCommentId) {
  const data = {
    articleId,
    content,
    parentCommentId
  };
  DataCon.postDataToServer(Url.getUrl('/comments'), 'POST', data).then(res => {
    if (parentCommentId === undefined) {
      dispatch({
        type: types.WRITE_COMMENT,
        comment: res,
        articleId
      });
    } else {
      dispatch({
        type: types.WRITE_COMMENT_REPLY,
        comment: res,
        parentCommentId
      });
    }
  }).catch(console.error);
}

export function editComment(dispatch, commentId, id, newContent, isChild = false) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${commentId}`), 'PUT', {
    content: newContent
  }).then(comment => {
    dispatch({
      type: isChild ? types.EDIT_COMMENT_REPLY : types.EDIT_COMMENT,
      comment,
      [isChild ? 'parentCommentId' : 'articleId']: id
    });
  }).catch(console.error);
}

export function deleteComment(dispatch, commentId, id, isChild = false) {
  DataCon.postDataToServer(Url.getUrl(`/comments/${commentId}`), 'DELETE').then(() => {
    dispatch({
      type: isChild ? types.DELETE_COMMENT_REPLY : types.DELETE_COMMENT,
      commentId,
      [isChild ? 'parentCommentId' : 'articleId']: id
    });
  }).catch(console.error);
}
