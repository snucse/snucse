import * as types from '../actionTypes';

export function updatesAppDimensions(dispatch, dimensions) {
  dispatch({
    type: types.UPDATE_APP_DIMENSIONS,
    dimensions
  });

  dispatch({
    type: types.UPDATE_MOBILE_STATE,
    isMobile: dimensions.width <= 768
  });
}
