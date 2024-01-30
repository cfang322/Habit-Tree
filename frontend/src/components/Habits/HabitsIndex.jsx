import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import { useEffect, useState } from "react";
import "./Habitsindex.css";

import Habit from "./Habit";

const HabitsIndex = () => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const habits = useSelector(selectAllHabitsArray);
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]; // Define daysOfWeek here

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

    for (let i = 1; i <= totalDays; i++) {
      datesRow.push(i);
    }

    return datesRow;
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

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div>
      <div className="navigation">
        <button onClick={goToPreviousMonth}>Previous Month</button>
        <span colSpan={datesRow.length + 1}>
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={goToNextMonth}>Next Month</button>
      </div>
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
          {habits.map((habit, index) => (
            <tr key={`${habit.id}_${index}`}>
              <Habit habit={habit} />
              {datesRow.map((date, index) => (
                <td key={index} className="td">
                  {/* <div className="box"></div> */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HabitsIndex;
