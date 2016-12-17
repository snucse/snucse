import {LOAD_ARTICLES_TAG, LOAD_PROFILE_TAG} from '../../actions/actionTypes';
import {updateObject, createReducer} from '../common';

const ATTACHED_TAGS_INITIAL_STATE = {
  profiles: {
    /*
    profileId: [
      { tag object },
      ...
    ]
    */
  },
  articles: {
  /* articleId: [ ~ ] */
  }
/* (태그가 붙을 수 있는 다른 오브젝트): { ~ } */
};

function loadArticlesTag(state, action) {
  const tagList = action.articles.map(article => {
    return {
      [article.id]: article.tags
    };
  });
  const articles = tagList.length === 0 ? {} : tagList.reduce((prev, curr) => {
    return updateObject(prev, curr);
  });
  if (action.reset) {
    return updateObject(state, {articles});
  }
  return updateObject(state, {articles: {...state.articles, ...articles}});
}

function loadProfileTag(state, action) {
  const newProfileTag = {
    [action.profileId]: action.tags
  };
  const profiles = updateObject(state.profiles, newProfileTag);
  return updateObject(state, {profiles});
}

export default createReducer(ATTACHED_TAGS_INITIAL_STATE, {
  [LOAD_ARTICLES_TAG]: loadArticlesTag,
  [LOAD_PROFILE_TAG]: loadProfileTag
});
