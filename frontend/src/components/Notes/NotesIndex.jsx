import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, selectAllNotesArray } from "../../store/reducers/notes";
import { useEffect } from "react";
import NoteIndexItem from "./NoteIndexItem";

const NotesIndex = () => {
    // const dispatch = useDispatch();
    // const notes = useSelector(selectAllNotesArray);
    
    // useEffect(() => {
    //     dispatch(fetchNotes());
    // }, [dispatch]);
    
    return (
        <div>
            <ul>
                {/* {notes.map((note) => (
                    <NoteIndexItem key={note.id} note={note} />
                ))} */}
            </ul>
        </div>
    );
};

export default NotesIndex;