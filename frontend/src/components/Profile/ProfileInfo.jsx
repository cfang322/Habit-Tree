import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllHabitsArray } from "../../store/reducers/habits";
import { fetchHabits } from "../../store/reducers/habits";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const habits = useSelector(selectAllHabitsArray);
  const [completedHabits, setCompletedHabits] = useState([]);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  useEffect(() => {
    const completed = habits.filter((habit) => habit.completed);
    setCompletedHabits(completed);
  }, [habits]);

  return (
    <div className="profileInfoWrapper">
      <h2 className="profileInfoHeader">Completed Habits</h2>
      <div className="completedHabitsContainer">
        {completedHabits.length > 0 ? (
          completedHabits.map((habit) => (
            <div key={habit._id} className="habitItem">
              <p className="habitTitleBox">{habit.name}</p>
              <p className="habitDetail">Goal: {habit.goal}</p>
              <p className="habitDetail">Achieved: {habit.achieved}</p>
            </div>
          ))
        ) : (
          <p className="noHabitsMessage">No completed habits to display.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
