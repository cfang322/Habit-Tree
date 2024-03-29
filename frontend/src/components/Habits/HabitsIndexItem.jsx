import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchNotes } from "../../store/reducers/notes";
import {
  deleteHabit,
  fetchHabits,
  selectAllHabitsArray,
  updateHabit,
} from "../../store/reducers/habits";
import * as modalActions from "../../store/reducers/modals";
import CreateHabit from "./CreateHabit";
import NoteIndex from "../Notes/NotesIndex";
import Tree from "../AnimateTree/Tree";
import "./HabitsIndexItem.css";
import "../Notes/NotesIndex.css";

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

  const handleBack = () => {
    navigate("/feed");
  };

  useEffect(() => {
    dispatch(fetchNotes(habitId));
  }, [dispatch, habitId]);

  const handleEdit = () => {
    setEditMode(true);
    dispatch(modalActions.showModal("SHOW_HABITS"));
  };

  const handleCloseModal = () => {
    setEditMode(false);
    dispatch(modalActions.hideModal());
  };

  useEffect(() => {
    if (habit && habit.achieved >= habit.goal) {
      dispatch(updateHabit(habitId, { completed: true }));
    } else {
      if (habit && habit.completed) {
        dispatch(updateHabit(habitId, { completed: false }));
      }
    }
  }, [dispatch, habit, habitId]);

  if (!habit) {
    return <div>Habit not found</div>;
  }


  let normalizedProgress = habit.achieved / habit.goal + 0.2;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="habit-container">
      <div id="habitItemBackBtnDiv">
        <button id="habitItemBackBtn" onClick={handleBack}>Home</button>
      </div>
      <Tree progress={normalizedProgress} goal={habit.goal} />
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
              <ul className="habit-detail">
                Category: <li id="habitLi">{habit.category}</li>
              </ul>
              <ul className="habit-detail">
                Habit: <li id="habitLi">{habit.habitType}</li>
              </ul>
              <ul className="habit-detail">
                Achieved: <li id="habitLi">{habit.achieved}</li>
              </ul>
              <ul className="habit-detail">
                Goal: <li id="habitLi">{habit.goal}</li>
              </ul>
              <ul className="habit-detail">
                Goal Period: <li id="habitLi">{habit.goalPeriod}</li>
              </ul>
              <ul className="habit-detail">
                Start Date:{" "}
                <li id="habitLi">
                  {habit.startDate
                    ? new Date(habit.startDate).toLocaleDateString()
                    : "Not Specified"}
                </li>
              </ul>
              <ul className="habit-detail">
                End Date:{" "}
                <li id="habitLi">
                  {habit.endDate
                    ? new Date(habit.endDate).toLocaleDateString()
                    : "Not Specified"}
                </li>
              </ul>
              <ul className="habit-detail">
                {habit.completed ? (
                  <li id="completedLi">Completed &#10003;</li>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="buttonsDiv">
              <div className="editDiv">
                <button onClick={handleEdit} className="submitBtn">
                  Edit
                </button>
              </div>
              <div className="deleteDiv">
                <button onClick={handleDelete} className="submitBtn">
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <NoteIndex habitId={habitId} />
      <ul className='upperHomeFooter' onClick={scrollToTop}>
        <p className="backToTopP">Back to top</p>
      </ul>
      <ul className='lowerFooter'>
        <p className='footerItem'>Copyright &copy; 2024 Habit Tree</p>
      </ul>
    </div>
  );
};

export default HabitIndexItem;
