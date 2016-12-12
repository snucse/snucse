import {LOAD_ARTICLE} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ARTICLE_INITIAL_STATE = {
  article: null,
  isError: false
};

function loadArticle(state, action) {
  return updateObject(state, {article: action.article, isError: action.isError});
}

export default createReducer(ARTICLE_INITIAL_STATE, {
  [LOAD_ARTICLE]: loadArticle
});
