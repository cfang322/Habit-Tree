import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../store/reducers/notes";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/Modal";
import './CreateNote.css';

const CreateNoteModal = () => {
  const [newNoteContent, setNewNoteContent] = useState("");
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    if (newNoteContent.trim() !== "") {
      const newNote = { content: newNoteContent };
      dispatch(createNote(newNote));
      setNewNoteContent("");
      dispatch(modalActions.hideModal());
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
    <Modal className='noteModal'>
      <div className='modalwrapper'>
        <div className="noteModalContent">
          <button className="close-btn" onClick={handleCloseBtn}>&#x2715;</button>
          <textarea
            placeholder="Enter new note content..."
            className="noteText"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="noteModalBtn" onClick={handleCreateNote}>Create Note</button>
        </div>
      </div>
    </Modal>

  );
};

export default CreateNoteModal;

