import { useState } from "react";
import { useDispatch } from "react-redux";
import { createHabit } from "../../store/reducers/habits";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/Modal";

const CreateHabit = () => {
  const dispatch = useDispatch();

  const [habitData, setHabitData] = useState({
    user: "",
    name: "",
    category: "",
    habitType: "building",
    acheived: 0,
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
  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };

  return (
    <Modal>
      <div className="habitModalWrapper">
        <button className="closeBtn" onClick={handleCloseBtn}>
          X
        </button>
        <div className="sharedBody">
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={habitData.name}
              onChange={handleChange}
            />
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={habitData.category}
              onChange={handleChange}
            />
            <label>Habit Type</label>
            <input
              type="text"
              name="habitType"
              value={habitData.habitType}
              onChange={handleChange}
            />
            <label>Achieved</label>
            <input
              type="number"
              name="achieved"
              value={habitData.acheived}
              onChange={handleChange}
            />
            <label>Goal</label>
            <input
              type="number"
              name="goal"
              value={habitData.goal}
              onChange={handleChange}
            />
            <label>Goal Period</label>
            <select
              name="goalPeriod"
              value={habitData.goalPeriod}
              onChange={handleChange}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={habitData.startDate}
              onChange={handleChange}
            />
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={habitData.endDate}
              onChange={handleChange}
            />
            <label>Completed:</label>
            <input
              type="checkbox"
              name="completed"
              checked={habitData.completed}
              onChange={() =>
                setHabitData({ ...habitData, completed: !habitData.completed })
              }
            />

            <button type="submit">Create Habit</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateHabit;
