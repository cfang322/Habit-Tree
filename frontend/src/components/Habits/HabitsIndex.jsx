import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import { useEffect } from "react";
import HabitIndexItem from "./HabitsIndexItem";

const HabitsIndex = () => {
  const dispatch = useDispatch();
  const habits = useSelector(selectAllHabitsArray);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {habits.map((habit) => (
          <HabitIndexItem key={habit.id} habit={habit} />
        ))}
      </ul>
    </div>
  );
};
export default HabitsIndex;
