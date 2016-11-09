import * as types from './actionTypes';

// action related with Article component
export function loadInitialArticle(data) {
  return {
    type: types.LOAD_INITIAL_ARTICLE,
    data
  };
}

export function loadArticle(data) {
  return {
    type: types.LOAD_ARTICLE,
    data
  };
}

export function scrollArticleListEnd() {
  return {
    type: types.SCROLL_ARTICLE_LIST_END
  };
}

export function onLoadArticle() {
  return {
    type: types.ON_LOADING_ARTICLE
  };
}
