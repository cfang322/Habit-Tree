import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  deleteHabit,
  fetchHabits,
  selectAllHabitsArray,
  // updateHabit,
} from "../../store/reducers/habits";
import * as modalActions from "../../store/reducers/modals";
import CreateHabit from "./CreateHabit";
import { useEffect, useState } from "react";

const HabitIndexItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { habitId } = useParams();
  const habits = useSelector(selectAllHabitsArray);
  const habit = habits.find((habit) => habit._id === habitId);
  // const modalType = useSelector((state) => state.modals.type === "SHOW_HABITS");

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch, habitId]);

  const handleDelete = () => {
    dispatch(deleteHabit(habitId));
    navigate("/feed");
  };

  const handleEdit = () => {
    setEditMode(true);
    dispatch(modalActions.showModal("SHOW_HABITS"));
  };

  const handleCloseModal = () => {
    setEditMode(false);
    dispatch(modalActions.hideModal());
  };

  if (!habit) {
    return <div>Habit not found</div>;
  }

  return (
    <div className="habit">
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {editMode ? (
        <CreateHabit
          editMode={true}
          habitToEdit={habit}
          handleCloseModal={handleCloseModal}
          // handleUpdate={handleUpdate}
        />
      ) : (
        <div className="allTheHabits">
          <h2>{habit.name}</h2>
          <p>{habit.category}</p>
          <p>{habit.habitType}</p>
          <p>{habit.achieved}</p>
          <p>{habit.goal}</p>
          <p>{habit.goalPeriod}</p>
          <p>{habit.startDate}</p>
          <p>{habit.endDate}</p>
          <p>{habit.completed}</p>
        </div>
      )}
    </div>
  );
};

export default HabitIndexItem;
