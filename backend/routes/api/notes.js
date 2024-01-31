const express = require("express");
const router = express.Router();
const noteController = require("../../controllers/noteController");


router.get("/:habitId", noteController.indexNotesByHabit);
router.post("/:habitId", noteController.createNote);
router.get("/:habitId/:noteId", noteController.showNote);
router.put("/:habitId/:noteId", noteController.updateNote);
router.delete("/:habitId/:noteId", noteController.deleteNote);

module.exports = router;
