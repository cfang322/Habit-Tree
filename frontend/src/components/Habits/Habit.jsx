import { useNavigate } from "react-router";
import "./Habit.css";

const Habit = ({ habit }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/habits/${habit._id}`);
  };

  return (
    <th className="th" onClick={handleClick}>
      <span className="habitTitle">{habit.name}</span>
    </th>
  );
};

export default Habit;
