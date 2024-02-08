import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../store/reducers/notes";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/Modal";
import './CreateNote.css';

const CreateNoteModal = ({ habitId }) => {
  const [newNoteContent, setNewNoteContent] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    if (newNoteContent.trim() !== "") {
      const newNote = { content: newNoteContent, habitId };
      dispatch(createNote(habitId, newNote));
      setNewNoteContent("");
      dispatch(modalActions.hideModal());
    } else {
      setError("Note content cannot be blank");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateNote();
    }
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal id='noteModal'>
      <div id='modalwrapper'>
        <div id="noteModalContent">
          <button id="close-btn" onClick={handleCloseBtn}>&#x2715;</button>
          <textarea
            placeholder="Enter new note content..."
            id="noteText"
            value={newNoteContent}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setNewNoteContent(e.target.value);
              setError(null); 
            }}
          />
          {error && <div id="editNoteError">{error}</div>}
          <button id="noteModalBtn" onClick={handleCreateNote}>Create Note</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNoteModal;