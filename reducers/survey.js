import {LOAD_SURVEY, OPEN_SURVEY, CLOSE_SURVEY} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const SURVEY_INITIAL_STATE = {
  opened: false
};

function loadSurvey(state, action) {
  return updateObject(state, {survey: action.survey});
}

function openSurvey(state) {
  return updateObject(state, {opened: true});
}

function closeSurvey(state) {
  return updateObject(state, {opened: false});
}

export default createReducer(SURVEY_INITIAL_STATE, {
  [LOAD_SURVEY]: loadSurvey,
  [OPEN_SURVEY]: openSurvey,
  [CLOSE_SURVEY]: closeSurvey
});
