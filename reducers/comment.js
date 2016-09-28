import Immutable from 'immutable'

import { LOAD_COMMENT, WRITE_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../actions/actionTypes'

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
  }
}

export default function comment(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_COMMENT: {
      let newComments = {}
      newComments[action.articleId] = action.comments
      const comments = Object.assign({}, state.comments, newComments)
      return Object.assign({}, state, {
        comments: comments,
      })
    }
    case WRITE_COMMENT: {
      console.log(action.articleId, action.comment)
      return state
    }
    case EDIT_COMMENT: {
      console.log(action.articleId, action.comment)
      return state
    }
    case DELETE_COMMENT: {
      console.log(action.articleId, action.comment)
      return state
    }
    default: {
      return state
    }
  }
}
