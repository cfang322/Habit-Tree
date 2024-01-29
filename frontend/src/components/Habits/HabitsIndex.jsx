import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import { useEffect } from "react";
import HabitIndexItem from "./HabitsIndexItem";

const HabitsIndex = () => {
  const dispatch = useDispatch();
  const habits = useSelector(selectAllHabitsArray);
  // const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {habits.map((habit, index) => (
          <HabitIndexItem key={`${habit.id}_${index}`} habit={habit} />
        ))}
      </ul>
    </div>
  );
};
export default HabitsIndex;
