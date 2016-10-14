import * as types from './actionTypes';

export function changeId(data) {
  return {
    type: types.CHANGE_ID,
    id: data
  };
}

export function changeName(data) {
  return {
    type: types.CHANGE_NAME,
    name: data
  };
}

export function changeDesc(data) {
  return {
    type: types.CHANGE_DESC,
    desc: data
  };
}
