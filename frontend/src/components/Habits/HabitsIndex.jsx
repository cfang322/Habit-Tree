// import { useDispatch, useSelector } from "react-redux";
// import { fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
// import { useEffect } from "react";
// // import HabitIndexItem from "./HabitsIndexItem";
// import "./HabitsIndex.css";

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
import "./HabitsIndex.css";
import { useSelector } from "react-redux";
import { selectAllHabitsArray } from "../../store/reducers/habits";

const HabitsIndex = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const habits = useSelector(selectAllHabitsArray);

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
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    return daysOfWeek;
  };

  const datesRow = generateDatesRow();
  const daysRow = generateDaysRow();

  return (
    <div>
      <div className="navigation">
        <button onClick={goToPreviousMonth}>Previous Month</button>
        <button onClick={goToNextMonth}>Next Month</button>
      </div>
      <table className="month-table">
        <thead>
          <tr>
            <th colSpan={datesRow.length + 1}>
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </th>
          </tr>
          <tr>
            <th></th>
            {datesRow.map((date, index) => (
              <th key={index}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysRow.map((day, index) => (
            <tr key={index}>
              <th>{day}</th>
              {datesRow.map((date, index) => (
                <td key={index}>
                  {habits.map((habit) => (
                    <span key={habit.id}>
                      {habit.dates.includes(date) && <span>{habit.name}</span>}
                    </span>
                  ))}
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
