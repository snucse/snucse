import * as types from './actionTypes'

// action related with Post component
export function loadInitialPost(data){
  return {
    type: types.LOAD_INITIAL_POST,
    data: data,
  }
}

export function loadPost(data){
  return {
    type: types.LOAD_POST,
    data: data,
  }
}

export function scrollPostListEnd(){
  return {
    type: types.SCROLL_POST_LIST_END,
  }
}
