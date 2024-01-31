// HabitsIndex.js
import { useDispatch } from "react-redux";
import { selectAllHabitsArray, updateHabit } from "../../store/reducers/habits";
import "./Habitsindex.css";
import Habit from "./Habit";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HabitsIndex = () => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [clickedCells, setClickedCells] = useState({}); // State to track clicked cells
  const habits = useSelector(selectAllHabitsArray);
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const rowColors = ["#FF5733", "#33FF57", "#5733FF", "#FF3399", "#33FFFF"]; // Example colors

  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDatesRow = () => {
    const totalDays = getDaysInMonth(currentMonth);
    return Array.from({ length: totalDays }, (_, index) => index + 1);
  };

  const generateDaysRow = () => {
    const totalDays = getDaysInMonth(currentMonth);
    const daysRow = [];

    let dayIndex = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    for (let i = 0; i < totalDays; i++) {
      daysRow.push(daysOfWeek[dayIndex]);
      dayIndex = (dayIndex + 1) % 7;
    }

    return daysRow;
  };

  const datesRow = generateDatesRow();
  const daysRow = generateDaysRow();

  // Load clicked cells from localStorage on component mount
  useEffect(() => {
    const storedClickedCells = localStorage.getItem("clickedCells");
    if (storedClickedCells) {
      setClickedCells(JSON.parse(storedClickedCells));
    }
  }, []);

  const handleClick = (habitId, habitIndex, dateIndex) => {
    const updatedHabit = { ...habits[habitIndex] };
    const cellKey = `${habitId}_${dateIndex}_${currentMonth.getMonth()}_${currentMonth.getFullYear()}`;

    if (clickedCells[cellKey]) {
      if (updatedHabit.achieved === 0) {
        return;
      }

      updatedHabit.achieved -= 1;
      const newClickedCells = { ...clickedCells };
      delete newClickedCells[cellKey];
      setClickedCells(newClickedCells);

      const updatedLocalStorage = {
        ...JSON.parse(localStorage.getItem("clickedCells")),
      };
      delete updatedLocalStorage[cellKey];
      localStorage.setItem("clickedCells", JSON.stringify(updatedLocalStorage));
    } else {
      updatedHabit.achieved += 1;
      setClickedCells({ ...clickedCells, [cellKey]: true });

      localStorage.setItem(
        "clickedCells",
        JSON.stringify({ ...clickedCells, [cellKey]: true })
      );
    }

    updatedHabit.achieved = Math.max(0, updatedHabit.achieved);

    dispatch(updateHabit(habitId, updatedHabit));
  };

  return (
    <div>
      <div className="navigation">
        <button onClick={goToPreviousMonth}>
          <img src="https://app.dailyhabits.xyz/static/icons/left.svg" />
        </button>
        <span colSpan={datesRow.length + 1}>
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={goToNextMonth}>
          <img src="https://app.dailyhabits.xyz/static/icons/right.svg" />
        </button>
      </div>
      <div className="feedTable">
        <table className="table">
          <thead>
            <tr>
              <th rowSpan={2} className="th">
                Habits
              </th>
              {daysRow.map((day, index) => (
                <th key={index} className="th">
                  {day}
                </th>
              ))}
              <th rowSpan={2} className="th">
                Goal
              </th>
              <th rowSpan={2} className="th">
                Achieved
              </th>
            </tr>
            <tr>
              {datesRow.map((date, index) => (
                <th
                  key={index}
                  className={
                    date === new Date().getDate() &&
                    currentMonth.getMonth() === new Date().getMonth()
                      ? "current-date th"
                      : "th"
                  }
                >
                  {date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tbody">
            {habits.map((habit, habitIndex) => (
              <tr key={`${habit._id}_${habitIndex}`}>
                <Habit habit={habit} />
                {datesRow.map((date, dateIndex) => (
                  <td
                    key={dateIndex}
                    className={
                      clickedCells[
                        `${
                          habit._id
                        }_${dateIndex}_${currentMonth.getMonth()}_${currentMonth.getFullYear()}`
                      ]
                        ? `tdBox clicked` // Add 'clicked' class if the cell is clicked
                        : `tdBox`
                    }
                    onClick={() =>
                      handleClick(habit._id, habitIndex, dateIndex)
                    }
                  >
                    {dateIndex ===
                    clickedCells[
                      `${
                        habit._id
                      }_${dateIndex}_${currentMonth.getMonth()}_${currentMonth.getFullYear()}`
                    ] ? (
                      <div
                        style={{
                          backgroundColor:
                            rowColors[habitIndex % rowColors.length],
                        }}
                      ></div>
                    ) : null}
                  </td>
                ))}
                <td className="goal">{habit.goal}</td>
                <td
                  className={
                    habit.achieved >= habit.goal ? "achieved" : "notAchieved"
                  }
                >
                  {habit.achieved}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitsIndex;
