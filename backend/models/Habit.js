const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
  name: { type: String, required: true },
  category: { type: String, required: true },
  habitType: { type:  String, enum: ['building', 'quitting'], required: true },
  achieved: { type: Number },
  goal: { type: Number },
  goalPeriod: {
    type: String,
    enum: ['day', 'week', 'month'],
  },
  startDate: { type: Date },
  endDate: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model('Habit', habitSchema)