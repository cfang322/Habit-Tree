import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "../../store/reducers/notes";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/Modal";
import "./CreateNote.css";

const EditNote = ({ note: initialNote, habitId }) => {
  const [editedContent, setEditedContent] = useState("");
  const dispatch = useDispatch();

  const handleUpdateNote = () => {
    const updatedNote = { ...initialNote, content: editedContent };
    dispatch(updateNote(habitId, updatedNote));
    dispatch(modalActions.hideModal());
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdateNote();
    }
  };

  const handleEditCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };

  useEffect(() => {
    setEditedContent(initialNote?.content || "");
  }, [initialNote]);

  return (
    <Modal id='noteModal'>
      <div id='modalwrapper'>
        <div id="noteModalContent">
          <button id="close-btn" onClick={handleEditCloseBtn}>&#x2715;</button>
          <textarea
            placeholder="Edit note content..."
            id="noteText"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleEditKeyDown}
          />
          <button id="noteModalBtn" onClick={handleUpdateNote}>Update Note</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditNote;