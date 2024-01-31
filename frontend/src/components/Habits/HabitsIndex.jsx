import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import { useEffect, useState } from "react";
import "./Habitsindex.css";

// const HabitsIndex = () => {
//   const dispatch = useDispatch();
//   const habits = useSelector(selectAllHabitsArray);

//   useEffect(() => {
//     dispatch(fetchHabits());
//   }, [dispatch]);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th rowSpan={2}>Habits</th>
//             <th>M</th>
//             <th>T</th>
//             <th>W</th>
//             <th>T</th>
//             <th>F</th>
//             <th>S</th>
//             <th>S</th>
//             <th>M</th>
//             <th>T</th>
//             <th>W</th>
//             <th>T</th>
//             <th>F</th>
//             <th>S</th>
//             <th>S</th>
//             <th>M</th>
//             <th>T</th>
//             <th>W</th>
//             <th>T</th>
//             <th>F</th>
//             <th>S</th>
//             <th>S</th>
//             <th>M</th>
//             <th>T</th>
//             <th>W</th>
//             <th>T</th>
//             <th>F</th>
//             <th>S</th>
//             <th>S</th>
//             <th>M</th>
//             <th>T</th>
//             <th>W</th>
//             <th rowSpan={2}>Goal</th>
//             <th rowSpan={2}>Achieved</th>
//           </tr>
//           <tr>
//             <th>1</th>
//             <th>2</th>
//             <th>3</th>
//             <th>4</th>
//             <th>5</th>
//             <th>6</th>
//             <th>7</th>
//             <th>8</th>
//             <th>9</th>
//             <th>10</th>
//             <th>11</th>
//             <th>12</th>
//             <th>13</th>
//             <th>14</th>
//             <th>15</th>
//             <th>16</th>
//             <th>17</th>
//             <th>18</th>
//             <th>19</th>
//             <th>20</th>
//             <th>21</th>
//             <th>22</th>
//             <th>23</th>
//             <th>24</th>
//             <th>25</th>
//             <th>26</th>
//             <th>27</th>
//             <th>28</th>
//             <th>29</th>
//             <th>30</th>
//             <th>31</th>
//           </tr>
//         </thead>
//         <tbody>
//           {habits.map((habit) => (
//             <tr key={habit.id}>
//               <td>{habit.name}</td>
//             </tr>
//             // {/* <HabitIndexItem key={`${habit.id}_${index}`} habit={habit} /> */}
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default HabitsIndex;

import { useState } from "react";
import "./Habitsindex.css";
import { useSelector } from "react-redux";
import { selectAllHabitsArray } from "../../store/reducers/habits";



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
