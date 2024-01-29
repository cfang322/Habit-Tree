import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, selectAllNotesArray } from "../../store/reducers/notes";
import { useEffect } from "react";
import NoteIndexItem from "./NoteIndexItem";
import "./NotesIndex.css";

const NotesIndex = () => {
    // const dispatch = useDispatch();
    // const notes = useSelector(selectAllNotesArray);
    
    // useEffect(() => {
    //     dispatch(fetchNotes());
    // }, [dispatch]);
    
    return (
        <div>
            <ul>
                <div className="notesIndex">
                    <h2>Notes Index</h2>
                    {/* <ul>
                        {notes.map((note) => (
                            <NoteIndexItem key={note.id} note={note} />
                        ))}
                    </ul> */}
                </div>
            </ul>
        </div>
    );
};

export default NotesIndex;