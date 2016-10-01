import Immutable from 'immutable';

import { LOAD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/actionTypes';

const INITIAL_STATE = {
  comments: {
    /*
    "article_id": {
      comments: [
        {},
        {},
      ]
    }
    */
  },
};

export default function comment(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_COMMENT: {
      let newComments = {};
      newComments[action.articleId] = action.comments;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments: comments,
      });
    }
    case WRITE_COMMENT: {
      // 끝에 추가 // concat
      const nestedComments = state.comments[action.articleId].concat([action.comment]);
      let newComments = {};
      newComments[action.articleId] = nestedComments;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments: comments,
      });
    }
    case EDIT_COMMENT: {
      // 찾아서 대체 // map 사용
      const nestedComments = state.comments[action.articleId].map(comment => {
        if (comment.id === action.comment.id){
          return action.comment:
        } else {
          return comment;
        }
      });
      let newComments = {};
      newComments[action.articleId] = nestedComments;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments: comments,
      });
    }
    case DELETE_COMMENT: {
      // 찾아서 삭제 // filter
      const nestedComments = state.comments[action.articleId].filter(comment => {
        return comment.id !== action.commentId;
      });
      let newComments = {};
      newComments[action.articleId] = nestedComments;
      const comments = Object.assign({}, state.comments, newComments);
      return Object.assign({}, state, {
        comments: comments,
      });
    }
    default: {
      return state;
    }
  }
};
