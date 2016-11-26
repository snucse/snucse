import {LOAD_SEARCH_RESULT} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

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

export default createReducer(SEARCH_RESULT_INITIAL_STATE, {
  [LOAD_SEARCH_RESULT]: loadSearchResult
});
