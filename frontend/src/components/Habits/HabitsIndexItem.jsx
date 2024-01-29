const HabitIndexItem = ({ habit }) => {
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
