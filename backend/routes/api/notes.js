const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/noteController");

// /api/habits/notes/:id
// /api/habits/:id/notes

router.get("/", noteController.indexNotes);
router.post("/", noteController.createNote);
router.get("/:noteId", noteController.showNote);
router.put("/:noteId", noteController.updateNote);
router.delete("/:noteId", noteController.deleteNote);

module.exports = router;
