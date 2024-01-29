const NoteIndexItem = ({ note }) => {
    return (
        <div className="note">
            <h4>{note.description}</h4>
            <p>{note.content}</p>
            <p>{note.createdAt}</p>
        </div>
    );
};

export default NoteIndexItem;