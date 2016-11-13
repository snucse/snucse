import {INITIALIZE_CANDIDATE_TAGS, LOAD_CANDIDATE_TAGS} from '../../actions/actionTypes';
import {updateObject} from '../common';

const CANDIDATE_TAGS_INITIAL_STATE = {
  tags: []
};

function initializeCandidateTags(candidateTagsState) {
  return updateObject(candidateTagsState, {tags: []});
}

function loadCandidateTags(candidateTagsState, action) {
  return updateObject(candidateTagsState, {tags: action.tags});
}

export default function candidateTagReducer(candidateTagsState = CANDIDATE_TAGS_INITIAL_STATE, action) {
  switch (action.type) {
    case INITIALIZE_CANDIDATE_TAGS: return initializeCandidateTags(candidateTagsState, action);
    case LOAD_CANDIDATE_TAGS: return loadCandidateTags(candidateTagsState, action);
    default: return candidateTagsState;
  }
}
