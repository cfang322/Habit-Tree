const Note = require("../models/Note");

const indexNotesByHabit = async (req, res) => {
  const { habitId } = req.params;

  try {
    const notes = await Note.find({ habit: habitId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNote = async (req, res) => {
  const { content } = req.body;
  const { habitId } = req.params;

  try {
    const newNote = new Note({
      habit: habitId,
      content,
    });

    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateNote = async (req, res) => {
  const { habitId, noteId } = req.params;
  const { content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
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
  const { habitId, noteId } = req.params;
  try {
    const note = await Note.findByIdAndDelete({ _id: noteId, habit: habitId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  indexNotesByHabit,
  showNote,
  createNote,
  updateNote,
  deleteNote,
};
