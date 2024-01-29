const Note = require('../models/Note');

const indexNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"})
  }
};


const showNote = async (req, res) => {
  const { habitId, noteId } = req.params;

  try {
    const note = await Note.findOne({ _id: noteId, habit: habitId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"})
  }
};


const createNote = async (req, res) => {
  const { habitId, userId, content } = req.body;

  try {
    const newNote = new Note({
      habit: habitId,
      user: userId,
      content,
    });

    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateNote = async (req, res) => {
  const { habitId, noteId } = req.params;
  const { content } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, habit: habitId },
      { content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  indexNotes,
  showNote,
  createNote,
  updateNote,
  deleteNote,
};