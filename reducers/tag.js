import {combineReducers} from 'redux';

import {LOAD_ARTICLES_TAG, LOAD_ARTICLE_TAG, LOAD_PROFILE_TAG, LOAD_TAG_INFORMATION, LOAD_TAGCLOUD} from '../actions/actionTypes';
import {updateObject} from './common';

/*
tag reducer structure

* attached
  * profiles
  * articles
* view
  * targetTag
* cloud
  * tags
*/

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

const TAG_VIEW_INITIAL_STATE = {
  targetTag: null // GET /api/v1/tags/:tag 의 response를 집어넣는다
};

const TAGCLOUD_INITIAL_STATE = {
  tags: []
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

function loadArticleTag(state, action) {
  const newArticleTag = {};
  newArticleTag[action.articleId] = action.tags;
  const articles = updateObject(state.articles, newArticleTag);
  return updateObject(state, {articles});
}

function loadProfileTag(state, action) {
  const newProfileTag = {};
  newProfileTag[action.profileId] = action.tags;
  const profiles = updateObject(state.profiles, newProfileTag);
  return updateObject(state, {profiles});
}

function attachedTagReducer(attachedTagsState = ATTACHED_TAGS_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_ARTICLES_TAG: return loadArticlesTag(attachedTagsState, action);
    case LOAD_ARTICLE_TAG: return loadArticleTag(attachedTagsState, action);
    case LOAD_PROFILE_TAG: return loadProfileTag(attachedTagsState, action);
    default: return attachedTagsState;
  }
}

function loadTagInformation(tagViewState, action) {
  return updateObject(tagViewState, {targetTag: action.tagInformation});
}

function tagViewReducer(tagViewState = TAG_VIEW_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_TAG_INFORMATION: return loadTagInformation(tagViewState, action);
    default: return tagViewState;
  }
}

function loadTagCloud(tagCloudState, action) {
  return updateObject(tagCloudState, {tags: action.tags});
}

function tagCloudReducer(tagCloudState = TAGCLOUD_INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_TAGCLOUD: return loadTagCloud(tagCloudState, action);
    default: return tagCloudState;
  }
}

export default combineReducers({
  attached: attachedTagReducer,
  view: tagViewReducer,
  cloud: tagCloudReducer
});
