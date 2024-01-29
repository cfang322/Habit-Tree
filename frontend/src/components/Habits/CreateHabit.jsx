import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHabit } from "../../store/reducers/habits";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/Modal";
import "./CreateHabit.css";

const CreateHabit = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const [habitData, setHabitData] = useState({
    user: userId,
    name: "",
    category: "",
    habitType: "building",
    achieved: 0,
    goal: 0,
    goalPeriod: "",
    startDate: "",
    endDate: "",
    completed: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData({
      ...habitData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHabit(habitData));
    dispatch(modalActions.hideModal());
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal>
      <div className="habitModalWrapper">
        <button className="closeBtn" onClick={handleCloseBtn}>
          X
        </button>
        <div className="sharedBody">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={habitData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={habitData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Habit Type:</label>
              <select
                name="habitType"
                value={habitData.habitType}
                onChange={handleChange}
              >
                <option value="building">Building</option>
                <option value="quitting">Quitting</option>
                required
              </select>
            </div>
            <div>
              <label>Achieved:</label>
              <input
                type="number"
                name="achieved"
                value={habitData.achieved}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Goal</label>
              <input
                type="number"
                name="goal"
                value={habitData.goal}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Goal Period:</label>
              <select
                name="goalPeriod"
                value={habitData.goalPeriod}
                onChange={handleChange}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={habitData.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={habitData.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="checkBox">
              <label>Completed:</label>
              <input
                className="check"
                type="checkbox"
                name="completed"
                checked={habitData.completed}
                onChange={() =>
                  setHabitData({
                    ...habitData,
                    completed: !habitData.completed,
                  })
                }
              />
            </div>

            <button type="submit">Create Habit</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateHabit;
