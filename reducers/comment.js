import {LOAD_COMMENT, SET_LAST_COMMENT, UNFOLD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../actions/actionTypes';

const INITIAL_STATE = {
  comments: {
    /*
    articleId: [
      {},
      {},
    ]
    */
  },
  loaded: {},
  fold: {}
};

export default function comment(state = INITIAL_STATE, action) {
  const {articleId} = action;
  switch (action.type) {
    case LOAD_COMMENT: {
      const newComments = {};
      newComments[articleId] = action.comments;
      const newLoaded = {};
      newLoaded[articleId] = true;
      const newFold = {};
      if (articleId in state.fold) {
        newFold[articleId] = true;
      }
      return Object.assign({}, state, {
        comments: {...state.comments, ...newComments},
        loaded: {...state.loaded, ...newLoaded},
        fold: {...state.fold, ...newFold}
      });
    }
    case SET_LAST_COMMENT: {
      const newComments = {};
      newComments[articleId] = [action.comment];
      const newLoaded = {};
      newLoaded[articleId] = false;
      const newFold = {};
      newFold[articleId] = false; // 더 보기 누르면 바로 펼친다
      return Object.assign({}, state, {
        comments: {...state.comments, ...newComments},
        loaded: {...state.loaded, ...newLoaded},
        fold: {...state.fold, ...newFold}
      });
    }
    case UNFOLD_COMMENT: {
      const newFold = {};
      newFold[articleId] = false;
      return Object.assign({}, state, {
        fold: {...state.fold, ...newFold}
      });
    }
    case WRITE_COMMENT: {
      // 끝에 추가 // concat
      const nestedComments = state.comments[articleId].concat([action.comment]);
      const newComments = {};
      newComments[articleId] = nestedComments;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments
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
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments
      });
    }
    default: {
      return state;
    }
  }
}
