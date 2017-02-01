import {LOAD_SURVEY} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const SURVEY_INITIAL_STATE = {};

function loadSurvey(state, action) {
  const {startTime, endTime, title, anonymous, voted, content} = action;
  return updateObject(state, {startTime, endTime, title, anonymous, voted, content});
}

export default createReducer(SURVEY_INITIAL_STATE, {
  [LOAD_SURVEY]: loadSurvey
});
