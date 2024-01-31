import { createSelector } from "reselect";
import jwtFetch from "../jwt";

const RECEIVE_HABITS = "RECEIVE_HABITS";
const RECEIVE_HABIT = "RECEIVE_HABIT";
const REMOVE_HABIT = "REMOVE_HABIT";

export const receiveHabits = (habits) => ({
  type: RECEIVE_HABITS,
  habits,
});

export const receiveHabit = (habit) => ({
  type: RECEIVE_HABIT,
  habit,
});

export const removeHabit = (habitId) => ({
  type: REMOVE_HABIT,
  habitId,
});

const selectHabits = (state) => state.habits;

export const selectAllHabitsArray = createSelector(selectHabits, (habits) =>
  Object.values(habits)
);

export const fetchHabits = () => async (dispatch) => {
  const res = await jwtFetch("/api/habits/feed");
  if (res.ok) {
    const habits = await res.json();
    dispatch(receiveHabits(habits));
  }
};

export const createHabit = (habit) => async (dispatch) => {
  const res = await jwtFetch("/api/habits/habit", {
    method: "POST",
    body: JSON.stringify(habit),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveHabit(data));
  }
};

export const updateHabit = (habitId, updatedHabit) => async (dispatch) => {
  const res = await jwtFetch(`/api/habits/${habitId}`, {
    method: "PUT",
    body: JSON.stringify(updatedHabit),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveHabit(data));
    dispatch(fetchHabits());
  }
};

export const deleteHabit = (habitId) => async (dispatch) => {
  const res = await jwtFetch(`/api/habits/${habitId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeHabit(habitId));
    dispatch(fetchHabits());
  }
};

const habitsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_HABITS:
      return action.habits;
    case RECEIVE_HABIT:
      return { ...state, [action.habit.id]: action.habit };
    case REMOVE_HABIT:
      delete nextState[action.habitId];
      return nextState;
    default:
      return state;
  }
};

export default habitsReducer;
