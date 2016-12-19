import {INITIALIZE_MODAL, DISABLE_MODAL, ENABLE_MODAL, SET_MODAL} from '../actions/actionTypes';
import {updateObject, createReducer} from './common';

const MODAL_INITIAL_STATE = {
  modalInfo: {
    type: '',
    title: '',
    message: '',
    buttons: []
  },
  enabled: false,
  closable: true // modal 이외부분 누르면 꺼지게
};

function initializeModal(state) {
  return updateObject(state, MODAL_INITIAL_STATE);
}

function disableModal(state) {
  return updateObject(state, {enabled: false});
}

function enableModal(state) {
  return updateObject(state, {enabled: true});
}

function setModal(state, action) {
  const {modalType, title, message, buttons, options} = action;
  const {closable} = options || {};
  const modalInfo = {
    type: modalType,
    title,
    message,
    buttons: buttons || []
  };
  return updateObject(state, {
    modalInfo,
    closable: closable === undefined ? true : closable,
    enabled: true
  });
}

export default createReducer(MODAL_INITIAL_STATE, {
  [INITIALIZE_MODAL]: initializeModal,
  [DISABLE_MODAL]: disableModal,
  [ENABLE_MODAL]: enableModal,
  [SET_MODAL]: setModal
});
