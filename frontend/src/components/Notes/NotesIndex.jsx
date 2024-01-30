import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotes, memoizedSelectNotes } from "../../store/reducers/notes";
import CreateNotes from "../Notes/CreateNotes";
import NoteIndexItem from "./NoteIndexItem";
import * as modalActions from "../../store/reducers/modals";
import "./NotesIndex.css";

const NotesIndex = () => {
  const dispatch = useDispatch();
  const notes = useSelector(memoizedSelectNotes);
  const modalType = useSelector((state) => state.modals.type === "SHOW_HABITS");

  useEffect(() => {
    dispatch(fetchNotes());
    dispatch(modalActions.hideModal());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault;
    dispatch(modalActions.showModal("SHOW_HABITS"));
  };



  return (
    <div className="noteIndexPage">
      <div className="createNoteBtnDiv">
        <button className="creatNoteBtn" onClick={handleClick}>Create Note</button>      </div>
      {modalType && <CreateNotes />}
      <ul className="notesList">
        <div className="notesIndex">
          <ul className="scrollable-list">
            {notes.map((note, index) => (
              <NoteIndexItem key={`${note.id}_${index}`} note={note} />
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default NotesIndex;
