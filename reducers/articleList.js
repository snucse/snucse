import {LOAD_ARTICLE, LOAD_INITIAL_ARTICLE, SCROLL_ARTICLE_LIST_END, ON_LOAD_ARTICLE} from '../actions/actionTypes';
import {updateObject} from './common';

const INITIAL_STATE = {
  data: {
    articles: []
  },
  articleNum: 5,
  loading: false
};

export default function articleList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ARTICLE: {
      return updateObject(state, {
        data: action.data
      });
    }
    case LOAD_INITIAL_ARTICLE: {
      return updateObject(state, {
      });
    }
    case SCROLL_ARTICLE_LIST_END: {
      return updateObject(state, {
        articleNum: state.articleNum + 1,
        loading: false
      });
    }
    // TODO: 페이징api가 구현되면 글을 불러오는 기능과 merge
    // reducers/articleList.js, actions/actionTypes.js, actions/index.js, components/ArticleList.js
    case ON_LOAD_ARTICLE: {
      return updateObject(state, {
        loading: true
      });
    }
    default: {
      return state;
    }
  }
}
