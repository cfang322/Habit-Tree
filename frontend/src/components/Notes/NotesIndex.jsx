import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotes, memoizedSelectNotes } from "../../store/reducers/notes";
import CreateNotes from "../Notes/CreateNotes";
import NoteIndexItem from "./NoteIndexItem";
import * as modalActions from "../../store/reducers/modals";
import "./NotesIndex.css";

const NotesIndex = ({ habitId }) => {
  const dispatch = useDispatch();
  const notes = useSelector(memoizedSelectNotes(habitId));
  const modalType = useSelector((state) => state.modals.type === "SHOW_CREATE_NOTE");
  useEffect(() => {
    dispatch(fetchNotes(habitId));

  }, [dispatch, habitId]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("SHOW_CREATE_NOTE"));
  };

  return (
    <div className="noteIndexPage">
      <div className="createNoteBtnDiv">
        <button className="creatNoteBtn" onClick={handleClick}>
          Create Note
        </button>
      </div>
      {modalType && <CreateNotes habitId={habitId} />}
      <ul className="notesList">
        <div className="notesIndex">
          <ul className="scrollable-list">
            {notes.map((note, index) => (
              <NoteIndexItem key={`${note._id}_${index}`} note={note} habitId={habitId} />
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default NotesIndex;
