import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/reducers/notes";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/Modal";
import "./CreateNote.css";

const EditNote = ({ note }) => {
  const [editedContent, setEditedContent] = useState("");
  const dispatch = useDispatch();

  const handleUpdateNote = () => {
    const updatedNote = { ...note, content: editedContent };
    dispatch(updateNote(updatedNote));
    dispatch(modalActions.hideModal());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdateNote();
    }
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };

  useEffect(() => {
    setEditedContent(note?.content || "");
  }, [note]);

  return (
    <Modal className='noteModal'>
      <div className='modalwrapper'>
        <div className="noteModalContent">
          <button className="close-btn" onClick={handleCloseBtn}>&#x2715;</button>
          <textarea
            placeholder="Edit note content..."
            className="noteText"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="noteModalBtn" onClick={handleUpdateNote}>Update Note</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditNote;