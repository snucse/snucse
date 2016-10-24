import {LOAD_ARTICLES_TAG, LOAD_ARTICLE_TAG, LOAD_PROFILE_TAG, LOAD_TAG_INFORMATION} from '../actions/actionTypes';

const INITIAL_STATE = {
  tags: {
    profiles: {
      /*
      profileId: [
        {},
        {},
        ...
      ]
      */
    },

    articles: {
      /*
      articleId: [
        ~
      ]
      */
    }

    /*
    others: {
      ~
    }
    */
  },

  tag: null // GET /api/v1/tags/:tag 의 response를 집어넣는다
};

export default function tag(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ARTICLES_TAG: {
      const tagList = action.articles.map(article => {
        const newArticleTag = {};
        newArticleTag[article.id] = article.tags;
        return newArticleTag;
      });
      const articles = tagList.length === 0 ? {} : tagList.reduce((prev, curr) => {
        return Object.assign({}, prev, curr);
      });
      const tags = Object.assign({}, state.tags, {
        articles
      });
      return Object.assign({}, state, {
        tags
      });
    }
    case LOAD_ARTICLE_TAG: {
      const newArticleTag = {};
      newArticleTag[action.articleId] = action.tags;
      const articles = Object.assign({}, state.tags.articles, newArticleTag);
      const tags = Object.assign({}, state.tags, {
        articles
      });
      return Object.assign({}, state, {
        tags
      });
    }
    case LOAD_PROFILE_TAG: {
      const newProfileTag = {};
      newProfileTag[action.profileId] = action.tags;
      const profiles = Object.assign({}, state.tags.profiles, newProfileTag);
      const tags = Object.assign({}, state.tags, {
        profiles
      });
      return Object.assign({}, state, {
        tags
      });
    }
    case LOAD_TAG_INFORMATION: {
      const tag = action.tagInformation;
      return Object.assign({}, state, {
        tag
      });
    }
    default: {
      return state;
    }
  }
}
