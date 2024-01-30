import { useNavigate } from "react-router";

const Habit = ({ habit }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/habits/${habit._id}`);
  };
  return (
    <th className="th" onClick={handleClick}>
      {habit.name}
    </th>
  );
};
export default Habit;
