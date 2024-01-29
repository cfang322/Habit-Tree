import HabitsIndex from "../Habits/HabitsIndex";
import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../store/reducers/modals";

import CreateHabit from "../Habits/createHabit";
import NavBar from "../NavBar/NavBar";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type === "SHOW_HABITS");

  const handleClick = (e) => {
    e.preventDefault;
    dispatch(modalActions.showModal("SHOW_HABITS"));
  };

  return (
    <div className="feedPage">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="feedContainer">
        <div>
          <HabitsIndex />
        </div>

        <button onClick={handleClick}>Add Habit</button>
        {modalType && <CreateHabit />}
      </div>
    </div>
  );
};
export default Feed;
