const SHOW_MODAL = "modal/showModal";
const HIDE_MODAL = "modal/hideModal";

export const showModal = (modalType) => ({
  type: SHOW_MODAL,
  modalType,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

function modalsReducer(state = { type: null }, action) {
  switch (action.type) {
  case SHOW_MODAL: {
    return { type: action.modalType };
  }
  case HIDE_MODAL:
    return { type: null };
  default:
    return state;
  }
}

export default modalsReducer;
