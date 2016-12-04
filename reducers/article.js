import {LOAD_ARTICLE} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ARTICLE_INITIAL_STATE = {
  article: null
};

function loadArticle(state, action) {
  return updateObject(state, {article: action.article});
}

export default createReducer(ARTICLE_INITIAL_STATE, {
  [LOAD_ARTICLE]: loadArticle
});
