import {LOAD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../actions/actionTypes';
import {updateObject, updateItemInArray} from './common';

const INITIAL_STATE = {
  comments: {
    /*
    articleId: [
      {},
      {},
    ]
    */
  }
};

export default function comment(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_COMMENT: {
      const newComments = {};
      newComments[action.articleId] = action.comments;
      const comments = updateObject(state.comments, newComments);
      return updateObject(state, {
        comments
      });
    }
    case WRITE_COMMENT: {
      // 끝에 추가 // concat
      const nestedComments = state.comments[action.articleId].concat([action.comment]);
      const newComments = {};
      newComments[action.articleId] = nestedComments;
      const comments = updateObject(state.comments, newComments);
      return updateObject(state, {
        comments
      });
    }
    case EDIT_COMMENT: {
      // 찾아서 대체 // map 사용
      const nestedComments = updateItemInArray(
          state.comments[action.articleId],
          'id',
          action.comment.id,
          () => action.comment
          );
      const newComments = {};
      newComments[action.articleId] = nestedComments;
      const comments = updateObject(state.comments, newComments);
      return updateObject(state, {
        comments
      });
    }
    case DELETE_COMMENT: {
      // 찾아서 삭제 // filter
      const nestedComments = state.comments[action.articleId].filter(comment => {
        return comment.id !== action.commentId;
      });
      const newComments = {};
      newComments[action.articleId] = nestedComments;
      const comments = updateObject(state.comments, newComments);
      return updateObject(state, {
        comments
      });
    }
    default: {
      return state;
    }
  }
}
