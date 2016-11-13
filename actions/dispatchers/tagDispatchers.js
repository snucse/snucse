import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadArticlesTag(dispatch, articles) {
  dispatch({
    type: types.LOAD_ARTICLES_TAG,
    articles
  });
}

export function loadArticleTag(dispatch, article) {
  dispatch({
    type: types.LOAD_ARTICLES_TAG,
    articles: [article]
  });
}

export function addTagToArticle(dispatch, articleId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`articles/${articleId}/add_tag`), 'POST', data).then(article => {
    loadArticleTag(dispatch, article);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function deleteTagToArticle(dispatch, articleId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`articles/${articleId}/destroy_tag`), 'POST', data).then(article => {
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
  DataCon.postDataToServer(Url.getUrl(`profiles/${profileId}/add_tag`), 'POST', data).then(profile => {
    loadProfileTag(dispatch, profile.id, profile.tags);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function deleteTagToProfile(dispatch, profileId, tagName) {
  const data = {
    tag: tagName
  };
  DataCon.postDataToServer(Url.getUrl(`profiles/${profileId}/destroy_tag`), 'POST', data).then(profile => {
    loadProfileTag(dispatch, profile.id, profile.tags);
    loadTagCloud(dispatch);
  }).catch(console.error);
}

export function loadTagInformation(dispatch, tagName) {
  DataCon.loadDataFromServer(Url.getUrl(`tags/show?tag=${tagName}`)).then(tagInformation => {
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
}

export function loadTagCloud(dispatch) {
  DataCon.loadDataFromServer(Url.getUrl('tags')).then(res => {
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
  DataCon.postDataToServer(Url.getUrl(`tags/add_related_tag`), 'POST', params).then(tagInformation => {
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
  DataCon.postDataToServer(Url.getUrl(`tags/destroy_related_tag`), 'POST', params).then(tagInformation => {
    dispatch({
      type: types.LOAD_TAG_INFORMATION,
      tagInformation
    });
  }).catch(console.error);
}
