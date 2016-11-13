import {LOAD_COMMENT, SET_LAST_COMMENT, MODIFY_FOLD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../actions/actionTypes';

const INITIAL_STATE = {
  comments: {
    /*
    articleId: [
      {},
      {},
    ]
    */
  },
  count: {},
  loaded: {},
  fold: {}
};

export default function comment(state = INITIAL_STATE, action) {
  const {articleId} = action;
  switch (action.type) {
    case LOAD_COMMENT: {
      const newComments = {};
      newComments[articleId] = action.comments;
      const newCount = {};
      newCount[articleId] = action.comments.length;
      const newLoaded = {};
      newLoaded[articleId] = true;
      const newFold = {};
      if (!(articleId in state.fold)) {
        newFold[articleId] = true;
      }
      return Object.assign({}, state, {
        comments: {...state.comments, ...newComments},
        count: {...state.count, ...newCount},
        loaded: {...state.loaded, ...newLoaded},
        fold: {...state.fold, ...newFold}
      });
    }
    case SET_LAST_COMMENT: {
      const newComments = {};
      newComments[articleId] = [action.comment];
      const newCount = {};
      newCount[articleId] = action.commentCount;
      const newLoaded = {};
      newLoaded[articleId] = false;
      const newFold = {};
      newFold[articleId] = false; // 더 보기 누르면 바로 펼친다
      return Object.assign({}, state, {
        comments: {...state.comments, ...newComments},
        count: {...state.count, ...newCount},
        loaded: {...state.loaded, ...newLoaded},
        fold: {...state.fold, ...newFold}
      });
    }
    case MODIFY_FOLD_COMMENT: {
      return Object.assign({}, state, {
        fold: {...state.fold, [articleId]: action.fold}
      });
    }
    case WRITE_COMMENT: {
      // 끝에 추가 // concat
      const nestedComments = state.comments[articleId].concat([action.comment]);
      const newComments = {};
      newComments[articleId] = nestedComments;
      const newCount = {};
      newCount[articleId] = nestedComments.length;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments,
        count: {...state.count, ...newCount}
      });
    }
    case EDIT_COMMENT: {
      // 찾아서 대체 // map 사용
      const nestedComments = state.comments[articleId].map(comment => {
        return comment.id === action.comment.id ? action.comment : comment;
      });
      const newComments = {};
      newComments[articleId] = nestedComments;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments
      });
    }
    case DELETE_COMMENT: {
      // 찾아서 삭제 // filter
      const nestedComments = state.comments[articleId].filter(comment => {
        return comment.id !== action.commentId;
      });
      const newComments = {};
      newComments[articleId] = nestedComments;
      const newCount = {};
      newCount[articleId] = nestedComments.length;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments,
        count: {...state.count, ...newCount}
      });
    }
    default: {
      return state;
    }
  }
}
