import {DataCon, Url} from '../../utils';
import * as types from '../actionTypes';

export function loadSurvey(dispatch, surveyId) {
  DataCon.loadDataFromServer(Url.getUrl(`/surveys/${surveyId}`)).then(survey => {
    dispatch({
      type: types.LOAD_SURVEY,
      survey
    });
  }).then(() => {
    dispatch({
      type: types.OPEN_SURVEY
    });
  }).catch(console.error);
}
