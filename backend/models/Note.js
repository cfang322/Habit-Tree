const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Note', noteSchema)