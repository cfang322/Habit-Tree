import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteNote, fetchNotes } from "../../store/reducers/notes";
import * as modalActions from "../../store/reducers/modals";
import EditNote from "./EditNote";
import "./NoteIndexItem.css";

const NoteIndexItem = ({ note }) => {
  const dispatch = useDispatch();
  const [showEditDropdown, setShowEditDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteNote(note.id));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(modalActions.showModal("SHOW_NOTE"));
  };

  const toggleDropdown = () => {
    setShowEditDropdown(!showEditDropdown);
  };

  return (
    <>
      <div className="noteItem">
        <div className="note-header">
          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={toggleDropdown}
            >
              &#8226;&#8226;&#8226;
            </button>
            {showEditDropdown && (
              <div className="dropdown-content">
                <button onClick={handleClick}>Edit</button>
                <EditNote note={note} />
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <p className="noteContent">{note?.content || "No content"}</p>
        <p>{note?.createdAt}</p>
      </div>
    </>
  );
};

export default NoteIndexItem;