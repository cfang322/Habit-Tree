import { useDispatch } from "react-redux";
import { selectAllHabitsArray, updateHabit } from "../../store/reducers/habits";
import "./Habitsindex.css";
import Habit from "./Habit";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HabitsIndex = () => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [clickedCells, setClickedCells] = useState({});
  const allHabits = useSelector(selectAllHabitsArray);
  const user = useSelector((state) => state.session.user);
  const habits = allHabits.filter((habit) => habit.user === user._id);
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const rowColors = ["#7da87d", "#33FF57", "#5733FF", "#FF3399", "#33FFFF"];

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
    const datesRow = [];
    const currentDate = new Date();

    for (let i = 0; i < totalDays; i++) {
      const currentDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i + 1
      );

      datesRow.push({
        day: i + 1,
        isCurrentDate:
          currentDay.getMonth() === currentDate.getMonth() &&
          currentDay.getFullYear() === currentDate.getFullYear() &&
          currentDay.getDate() === currentDate.getDate(),
      });
    }

    return datesRow;
  };

  const generateDaysRow = () => {
    const totalDays = getDaysInMonth(currentMonth);
    const daysRow = [];
    const currentDate = new Date();

    let dayIndex = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    for (let i = 0; i < totalDays; i++) {
      const currentDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i + 1
      );

      daysRow.push({
        day: daysOfWeek[dayIndex],
        isCurrentDate:
          currentDay.getMonth() === currentDate.getMonth() &&
          currentDay.getFullYear() === currentDate.getFullYear() &&
          currentDay.getDate() === currentDate.getDate(),
      });
      dayIndex = (dayIndex + 1) % 7;
    }

    return daysRow;
  };

  const datesRow = generateDatesRow();
  const daysRow = generateDaysRow();

  useEffect(() => {
    const storedClickedCells = localStorage.getItem("clickedCells");
    if (storedClickedCells) {
      setClickedCells(JSON.parse(storedClickedCells));
    }
  }, []);
  const handleClick = (habitId, habitIndex, dateIndex) => {
    const updatedHabit = { ...habits[habitIndex] };
    const cellKey = `${habitId}_${dateIndex}_${currentMonth.getMonth()}_${currentMonth.getFullYear()}`;

    setClickedCells((prevClickedCells) => {
      const newClickedCells = { ...prevClickedCells };

      if (newClickedCells[cellKey]) {
        if (updatedHabit.achieved === 0) {
          return prevClickedCells;
        }

        dispatch(
          updateHabit(
            habitId,
            (updatedHabit._id,
            { ...updatedHabit, achieved: updatedHabit.achieved - 1 })
          )
        );
        delete newClickedCells[cellKey];
      } else {
        dispatch(
          updateHabit(
            habitId,
            (updatedHabit._id,
            { ...updatedHabit, achieved: updatedHabit.achieved + 1 })
          )
        );
        newClickedCells[cellKey] = true;
      }
      localStorage.setItem("clickedCells", JSON.stringify(newClickedCells));

      return newClickedCells;
    });
  };

  return (
    <div>
      <div className="navigation">
        <button onClick={goToPreviousMonth} className="arrow">
          <img src="https://app.dailyhabits.xyz/static/icons/left.svg" />
        </button>
        <span colSpan={datesRow.length + 1}>
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={goToNextMonth} className="arrow">
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
                <th
                  key={index}
                  className={
                    day.isCurrentDate ? "current-date th" : "th"
                  }
                >
                  {day.day}
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
                    date.isCurrentDate ? "current-date th" : "th"
                  }
                >
                  {date.day}
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
                    className="tdBox"
                    style={{
                      backgroundColor:
                        clickedCells[
                          `${
                            habit._id
                          }_${dateIndex}_${currentMonth.getMonth()}_${currentMonth.getFullYear()}`
                        ] !== undefined
                          ? rowColors[habitIndex % rowColors.length]
                          : "transparent",
                    }}
                    onClick={() =>
                      handleClick(habit._id, habitIndex, dateIndex)
                    }
                  >
                    {/* const colorIndex = habitIndex % rowColors.length; */}
                    {clickedCells[
                      `${
                        habit._id
                      }_${dateIndex}_${currentMonth.getMonth()}_${currentMonth.getFullYear()}`
                    ] !== undefined ? (
                        <div className="checkMarks">&#10003;</div>
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
