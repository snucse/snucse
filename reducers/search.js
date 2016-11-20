import {LOAD_SEARCH_RESULT} from '../actions/actionTypes';
import {updateObject} from './common';
// fixme refactoring reducer

const SEARCH_RESULT_INITIAL_STATE = {
  articles: [],
  comments: [],
  profiles: [],
  tags: []
};

function loadSearchResult(state, action) {
  return updateObject(state, {
    articles: action.articles,
    comments: action.comments,
    profiles: action.profiles,
    tags: action.tags
  });
}

export default function search(state = SEARCH_RESULT_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_SEARCH_RESULT: return loadSearchResult(state, action);
    default: return state;
  }
}
