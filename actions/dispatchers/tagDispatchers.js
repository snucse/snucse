import {browserHistory} from 'react-router';
import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';
import {alertModal} from './modalDispatchers';

export function loadArticlesTag(dispatch, articles, reset = false) {
  dispatch({
    type: types.LOAD_ARTICLES_TAG,
    articles,
    reset
  });
}

export function loadArticleTag(dispatch, article) {
  dispatch({
    type: types.LOAD_ARTICLES_TAG,
    articles: [article],
    reset: false
  });
}

export function addTagToArticle(dispatch, articleId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`/articles/${articleId}/add_tag`), 'POST', data).then(article => {
    loadArticleTag(dispatch, article);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function deleteTagToArticle(dispatch, articleId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`/articles/${articleId}/destroy_tag`), 'POST', data).then(article => {
    loadArticleTag(dispatch, article);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function loadProfileTag(dispatch, profileId, tags) {
  dispatch({
    type: types.LOAD_PROFILE_TAG,
    profileId,
    tags
  });
}

export function addTagToProfile(dispatch, profileId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`/profiles/${profileId}/add_tag`), 'POST', data).then(profile => {
    loadProfileTag(dispatch, profile.id, profile.tags);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function deleteTagToProfile(dispatch, profileId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`/profiles/${profileId}/destroy_tag`), 'POST', data).then(profile => {
    loadProfileTag(dispatch, profile.id, profile.tags);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function loadTagInformation(dispatch, tagName) {
  if (tagName) {
    dispatch({
      type: types.RESET_TAG_INFORMATION
    });
    DataCon.loadDataFromServer(Url.getUrl('/tags/show', {tag: tagName})).then(tagInformation => {
      dispatch({
        type: types.LOAD_TAG_INFORMATION,
        tagInformation
      });
    }).catch(err => {
      console.error(err);
      dispatch({
        type: types.LOAD_TAG_INFORMATION,
        tagInformation: null
      });
    });
  } else {
    alertModal(dispatch, '알림', '정상적이지 않은 접근입니다.', () => {
      browserHistory.goBack();
    });
  }
}

export function loadTagCloud(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('/tags/recent')).then(res => {
    dispatch({
      type: types.LOAD_TAGCLOUD,
      tags: res.tags
    });
  }).catch(console.error);
}

export function makeTagRelationship(dispatch, targetTagName, tagName) {
  const params = {
    tag: targetTagName,
    relatedTag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`/tags/add_related_tag`), 'POST', params).then(tagInformation => {
    dispatch({
      type: types.LOAD_TAG_INFORMATION,
      tagInformation
    });
  }).catch(console.error);
}

export function breakTagRelationship(dispatch, targetTagName, tagName) {
  const params = {
    tag: targetTagName,
    relatedTag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`/tags/destroy_related_tag`), 'POST', params).then(tagInformation => {
    dispatch({
      type: types.LOAD_TAG_INFORMATION,
      tagInformation
    });
  }).catch(console.error);
}

export function initializeCandidateTags(dispatch, tagFormId) {
  dispatch({type: types.INITIALIZE_CANDIDATE_TAGS, tagFormId});
}

export function loadCandidateTags(dispatch, tagFormId, query) {
  DataCon.loadDataFromServer(Url.getUrl(`/tags`, {prefix: query})).then(res => {
    dispatch({
      type: types.LOAD_CANDIDATE_TAGS,
      tagFormId,
      tags: res.tags.slice(0, 10)
    });
    // fixme slice at the server
  }).catch(console.error);
}
