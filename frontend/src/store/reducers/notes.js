import { createSelector } from "reselect";
import jwtFetch from "../jwt";

const RECEIVE_NOTES = "RECEIVE_NOTES";
const RECEIVE_NOTE = "RECEIVE_NOTE";
const REMOVE_NOTE = "REMOVE_NOTE";

export const receiveNotes = (notes) => ({
  type: RECEIVE_NOTES,
  notes,
});

export const receiveNote = (note) => ({
  type: RECEIVE_NOTE,
  note,
});

export const removeNote = (noteId) => ({
  type: REMOVE_NOTE,
  noteId,
});

export const selectNote = (noteId) => (state) => {
  return state?.notes ? state.notes[noteId] : null;
};

const selectNotes = (state) => state?.notes || {};



export const memoizedSelectNotes = (habitId) =>
  createSelector([selectNotes], (notes) =>
    Object.values(notes).filter((note) => note.habit === habitId)
  );

export const fetchNotes = (habitId) => async (dispatch) => {
  const res = await jwtFetch(`/api/notes/${habitId}`);
  if (res.ok) {
    const notes = await res.json();
    dispatch(receiveNotes(notes));
  }
};

export const fetchNote = (habitId, note) => async (dispatch) => {
  const res = await jwtFetch(`/api/notes/${habitId}/${note._id}`, {
    method: "GET",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveNote(data));
  }
};

export const createNote = (habitId, note) => async (dispatch) => {
  const res = await jwtFetch(`/api/notes/${habitId}`, {
    method: "POST",
    body: JSON.stringify(note),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveNote(data));
    // dispatch(fetchNotes(habitId));
  }
};

export const updateNote = (habitId, note) => async (dispatch) => {
  const { _id, content } = note;
  const res = await jwtFetch(`/api/notes/${habitId}/${_id}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveNote(data));
    
  }
};

export const deleteNote = (habitId, noteId) => async (dispatch) => {
  const res = await jwtFetch(`/api/notes/${habitId}/${noteId}`, {
    method: "DELETE",
    body: JSON.stringify({ noteId }),
  });
  if (res.ok) {
    dispatch(removeNote(noteId));
  }
};

const notesReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
  case RECEIVE_NOTES:
    return {
      ...nextState,
      ...action.notes.reduce((acc, note) => {
        acc[note._id] = note;
        return acc;
      }, {}),
    };
  case RECEIVE_NOTE:
    return { ...nextState, [action.note._id]: action.note };
  case REMOVE_NOTE:
    delete nextState[action.noteId];
    return nextState;
  default:
    return state;
  }
};

export default notesReducer;
