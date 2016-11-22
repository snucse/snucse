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
      const newFold = {};
      if (!(articleId in state.fold)) {
        newFold[articleId] = true;
      }
      return Object.assign({}, state, {
        comments: {...state.comments, [articleId]: action.comments},
        count: {...state.count, [articleId]: action.comments.length},
        loaded: {...state.loaded, [articleId]: true},
        fold: {...state.fold, ...newFold}
      });
    }
    case SET_LAST_COMMENT: {
      return Object.assign({}, state, {
        comments: {...state.comments, [articleId]: [action.comment]},
        count: {...state.count, [articleId]: action.commentCount},
        loaded: {...state.loaded, [articleId]: false},
        fold: {...state.fold, [articleId]: false}
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
      return Object.assign({}, state, {
        comments: {...state.comments, [articleId]: nestedComments},
        count: {...state.count, [articleId]: nestedComments.length}
      });
    }
    case EDIT_COMMENT: {
      // 찾아서 대체 // map 사용
      const nestedComments = state.comments[articleId].map(comment => {
        return comment.id === action.comment.id ? action.comment : comment;
      });
      return Object.assign({}, state, {
        comments: {...state.comments, [articleId]: nestedComments}
      });
    }
    case DELETE_COMMENT: {
      // 찾아서 삭제 // filter
      const nestedComments = state.comments[articleId].filter(comment => {
        return comment.id !== action.commentId;
      });
      return Object.assign({}, state, {
        comments: {...state.comments, [articleId]: nestedComments},
        count: {...state.count, [articleId]: nestedComments.length}
      });
    }
    default: {
      return state;
    }
  }
}
