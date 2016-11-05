import {LOAD_ARTICLES_TAG, LOAD_PROFILE_TAG} from '../../actions/actionTypes';
import {updateObject} from '../common';

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
    const newArticleTag = {};
    newArticleTag[article.id] = article.tags;
    return newArticleTag;
  });
  const articles = tagList.length === 0 ? {} : tagList.reduce((prev, curr) => {
    return updateObject(prev, curr);
  });
  return updateObject(state, {articles});
}

function loadProfileTag(state, action) {
  const newProfileTag = {};
  newProfileTag[action.profileId] = action.tags;
  const profiles = updateObject(state.profiles, newProfileTag);
  return updateObject(state, {profiles});
}

export default function attachedTagReducer(attachedTagsState = ATTACHED_TAGS_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ARTICLES_TAG: return loadArticlesTag(attachedTagsState, action);
    case LOAD_PROFILE_TAG: return loadProfileTag(attachedTagsState, action);
    default: return attachedTagsState;
  }
}
