import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteHabit, fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import * as modalActions from "../../store/reducers/modals";
import CreateHabit from "./CreateHabit";
import { useEffect, useState } from "react";
import './HabitsIndexItem.css';
import placeholder from '../../assets/placeholder.jpg';

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
    <div className="habit-container">
      <img src={placeholder} alt="gsap-image" className="habit-image" height={500} width={500}/>
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
              <ul className="habit-detail">Category: <li>{habit.category}</li></ul>
              <ul className="habit-detail">Habit: <li>{habit.habitType}</li></ul>
              <ul className="habit-detail">Achieved: <li>{habit.achieved}</li></ul>
              <ul className="habit-detail">Goal: <li>{habit.goal}</li></ul>
              <ul className="habit-detail">Goal Period: <li>{habit.goalPeriod}</li></ul>
              <ul className="habit-detail">Start Date: <li>{habit.startDate ? new Date(habit.startDate).toLocaleDateString() : 'Not Specified'}</li></ul>
              <ul className="habit-detail">End Date: <li>{habit.endDate ? new Date(habit.endDate).toLocaleDateString() : 'Not Specified'}</li></ul>
              <ul className="habit-detail">Completed: <li>{habit.completed}</li></ul>
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
    </div>
  );
};

export default HabitIndexItem;