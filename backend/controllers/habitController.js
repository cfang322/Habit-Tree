const Habit = require('../models/Habit')

const indexHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
};


const showHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findById(id)

    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createHabit = async (req, res) => {
  const {
    user,
    name,
    category,
    habitType,
    achieved,
    goal,
    goalPeriod,
    startDate,
    endDate,
    completed,
  } = req.body;

  try {
    const newHabit = new Habit({
      user,
      name,
      category,
      habitType,
      achieved,
      goal,
      goalPeriod,
      startDate,
      endDate,
      completed,
    }); 

    const savedHabit = await newHabit.save();
    res.json(savedHabit)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const updateHabit = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    habitType,
    achieved,
    goal,
    goalPeriod,
    startDate,
    endDate,
    completed,
  } = req.body;

  try {
    const habit = await Habit.findByIdAndUpdate(
      id,
      {
        name,
        category,
        habitType,
        achieved,
        goal,
        goalPeriod,
        startDate,
        endDate,
        completed,
      },
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
};


const deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findByIdAndDelete(id);;
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json({ message: 'Habit deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  indexHabits,
  showHabit,
  createHabit,
  updateHabit,
  deleteHabit,
};