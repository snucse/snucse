import {LOAD_ARTICLE, CLEAR_ARTICLE_VIEW} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ARTICLE_INITIAL_STATE = {
  article: null,
  isError: false
};

function loadArticle(state, action) {
  return updateObject(state, {article: action.article, isError: action.isError});
}

function clearArticleView(state) {
  return updateObject(state, {article: null, isError: false});
}

export default createReducer(ARTICLE_INITIAL_STATE, {
  [LOAD_ARTICLE]: loadArticle,
  [CLEAR_ARTICLE_VIEW]: clearArticleView
});
