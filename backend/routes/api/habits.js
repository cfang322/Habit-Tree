const express = require("express");
const router = express.Router();
const habitController = require("../../controllers/habitController");

router.get("/feed", habitController.indexHabits);
router.post("/habit", habitController.createHabit);
router.get("/:id", habitController.showHabit);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);

module.exports = router;
