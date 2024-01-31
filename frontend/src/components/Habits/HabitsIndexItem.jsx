import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectAllHabitsArray } from "../../store/reducers/habits";

const HabitIndexItem = () => {
  const { habitId } = useParams();
  const habits = useSelector(selectAllHabitsArray); // Assuming 'habits' is the slice of state containing habit data
  const habit = habits.find((habit) => habit._id === habitId); // Find the habit with the corresponding id

  if (!habit) {
    return <div>Habit not found</div>;
  }

  return (
    <div className="habit">
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
  );
};

export default HabitIndexItem;
