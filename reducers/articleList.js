import {LOAD_ARTICLE, LOAD_INITIAL_ARTICLE, SCROLL_ARTICLE_LIST_END} from '../actions/actionTypes';

const INITIAL_STATE = {
  data: {
    articles: []
  },
  articleNum: 5
};

export default function articleList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ARTICLE: {
      return Object.assign({}, state, {
        data: action.data
      });
    }
    case LOAD_INITIAL_ARTICLE: {
      return Object.assign({}, state, {
      });
    }
    case SCROLL_ARTICLE_LIST_END: {
      return Object.assign({}, state, {
        articleNum: state.articleNum + 1
      });
    }
    default: {
      return state;
    }
  }
}
