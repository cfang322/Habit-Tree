import { useDispatch, useSelector } from "react-redux";
import { fetchHabits, selectAllHabitsArray } from "../../store/reducers/habits";
import { useEffect } from "react";
// import HabitIndexItem from "./HabitsIndexItem";
import "./HabitsIndex.css";

const HabitsIndex = () => {
  const dispatch = useDispatch();
  const habits = useSelector(selectAllHabitsArray);

  // const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div>
      <h1>Habits</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
          </tr>
          <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
            <th>16</th>
            <th>17</th>
            <th>18</th>
            <th>19</th>
            <th>20</th>
            <th>21</th>
            <th>22</th>
            <th>23</th>
            <th>24</th>
            <th>25</th>
            <th>26</th>
            <th>27</th>
            <th>28</th>
            <th>29</th>
            <th>30</th>
            <th>31</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <>
              <tr>
                <td>{habit.name}</td>
              </tr>
              {/* <HabitIndexItem key={`${habit.id}_${index}`} habit={habit} /> */}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HabitsIndex;
