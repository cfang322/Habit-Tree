import { createSelector } from "reselect";
import jwtFetch from "../jwt";

const RECEIVE_NOTES = "RECEIVE_NOTES";
const RECEIVE_NOTE = "RECEIVE_NOTE";
const REMOVE_NOTE= "REMOVE_NOTE";

export const receiveNotes = (notes) => ({
    type: RECEIVE_NOTES,
    notes,
});

export const receiveHabit = (note) => ({
    type: RECEIVE_NOTE,
    note,
});

export const removeHabit = (noteId) => ({
    type: REMOVE_NOTE,
    noteId,
});

const selectNotes = (state) => state.notes;

export const selectAllNotesArray = createSelector(selectNotes, (notes) =>
    Object.values(notes)
);

export const fetchNotes = () => async (dispatch) => {
    const res = await jwtFetch("/api/habits/notes");
    if (res.ok) {
        const notes = await res.json();
        dispatch(receiveNotes(notes));
    }
};

export const createNote = (note) => async (dispatch) => {
    const res = await jwtFetch(`/api/habits/notes`, {
        method: "POST",
        body: JSON.stringify(note),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveNote(data));
    }
};

export const updateNote = (note) => async (dispatch) => {
    const res = await jwtFetch(`/api/habits/notes/${note.id}`, {
        method: "PUT",
        body: JSON.stringify(note),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(receiveNote(data));
    }
};

export const deleteNote = (noteId) => async (dispatch) => {
    const res = await jwtFetch(`api/habits/notes/${noteId}`, {
        method: "DELETE",
        body: JSON.stringify(noteId),
    });
    if (res.ok) {
        dispatch(removeHabit(habitId));
    }
};

const notesReducer = (state ={}, action) => {
    const nextState = { ...state };
    switch (action.type) {
        case RECEIVE_NOTES:
            return { ...action.notes };
        case RECEIVE_NOTE:
            return { ...nextState, [action.note.id]: action.note }
        case REMOVE_HABIT:
            delete nextState[action.noteId];
            return nextState;
        default:
            return state;
    }
};

export default notesReducer;