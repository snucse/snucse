import * as types from './actionTypes'

export function loadProfiles(data){
  return {
    type: types.LOAD_PROFILES,
    data: data,
  }
}
