import {LOAD_ARTICLE, LOAD_INITIAL_ARTICLE, SCROLL_ARTICLE_LIST_END, ON_LOAD_ARTICLE} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const ARTICLE_LIST_INITIAL_STATE = {
  articles: [],
  articleNum: 5,
  loading: false
};

function loadArticle(state, action) {
  return updateObject(state, {articles: action.articles});
}

function loadInitialArticle(state) {
  return updateObject(state, {});
}

function scrollArticleListEnd(state) {
  return updateObject(state, {
    articleNum: state.articleNum + 1,
    loading: false
  });
}

function onLoadArticle(state) {
  // TODO: 페이징api가 구현되면 글을 불러오는 기능과 merge
  // reducers/articleList.js, actions/actionTypes.js, actions/index.js, components/ArticleList.js
  return updateObject(state, {
    loading: true
  });
}

export default createReducer(ARTICLE_LIST_INITIAL_STATE, {
  [LOAD_ARTICLE]: loadArticle,
  [LOAD_INITIAL_ARTICLE]: loadInitialArticle,
  [SCROLL_ARTICLE_LIST_END]: scrollArticleListEnd,
  [ON_LOAD_ARTICLE]: onLoadArticle
});
