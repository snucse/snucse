import * as types from './actionTypes';

export function changeSid(data) {
  return {
    type: types.CHANGE_SID,
    sid: data
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
