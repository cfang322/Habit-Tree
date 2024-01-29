const express = require('express');
const router = express.Router();
const noteController = require('../../controllers/noteController');

// /api/habits/notes/:id
// /api/habits/:id/notes

router.get('/:habitId/notes', noteController.indexNotes);
router.post('/:habitId/notes', noteController.createNote);
router.get('/:habitId/notes/:noteId', noteController.showNote);
router.put('/:habitId/notes/:noteId', noteController.updateNote);
router.delete('/:habitId/notes/:noteId', noteController.deleteNote);

module.exports = router