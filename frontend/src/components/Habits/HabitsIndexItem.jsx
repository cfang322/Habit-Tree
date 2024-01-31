import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteHabit, fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import * as modalActions from "../../store/reducers/modals";
import CreateHabit from "./CreateHabit";
import { useEffect, useState } from "react";
import './HabitsIndexItem.css';

const HabitIndexItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { habitId } = useParams();
  const habits = useSelector(selectAllHabitsArray);
  const habit = habits.find((habit) => habit._id === habitId);
  
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
      {editMode ? (
        <CreateHabit
          editMode={true}
          habitToEdit={habit}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <>
          <div className="allTheHabits">
            <h1>{habit.name}</h1>
            <p>Category: {habit.category}</p>
            <p>Habit: {habit.habitType}</p>
            <p>Achieved: {habit.achieved}</p>
            <p>Goal: {habit.goal}</p>
            <p>Goal Period: {habit.goalPeriod}</p>
            <p>Start Date: {habit.startDate}</p>
            <p>End Date: {habit.endDate}</p>
            <p>Completed: {habit.completed}</p>
          </div>
          <div className="buttonsDiv">
            <div className="editDiv">
              <button onClick={handleEdit}>Edit</button>
            </div>
            <div className="deleteDiv">
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HabitIndexItem;