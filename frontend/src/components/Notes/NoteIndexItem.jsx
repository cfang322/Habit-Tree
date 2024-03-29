import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../store/reducers/notes";
import * as modalActions from "../../store/reducers/modals";
import EditNote from "./EditNote";
import "./NoteIndexItem.css";

const NoteIndexItem = ({ note, habitId }) => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type === "SHOW_NOTE");

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteNote(habitId, note._id));
  };

  const handleClick = () => {
    dispatch(modalActions.showModal("SHOW_NOTE", note));
  };

  const createdAtString = note?.createdAt || "";
  const createdAt = new Date(createdAtString);
  const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <>
      <div id="noteItem">
        <div id="note-header">
          <div id="noteDropdown"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <button id="noteDropdown-btn">&#8226;&#8226;&#8226;</button>
            {isDropdownVisible && (
              <div id="noteDropdown-content">
                <button id='noteBtn' onClick={handleClick}>Edit</button>
                <button id='noteBtn' onClick={handleDelete}>Delete</button>
                {modalType && <EditNote note={note} habitId={habitId} />}
              </div>
            )}
          </div>
        </div>
        <p id="noteContent">{note?.content || "No content"}</p>
        <p>{formattedDate}</p>
      </div>
    </>
  );
};

export default NoteIndexItem;
