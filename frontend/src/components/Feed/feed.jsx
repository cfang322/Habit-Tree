import HabitsIndex from "../Habits/HabitsIndex";
import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../store/reducers/modals";

import CreateHabit from "../Habits/createHabit";
import NavBar from "../NavBar/NavBar";
import "./Feed.css";
import { useEffect, useState } from "react";
import { fetchHabits } from "../../store/reducers/habits";
import ReminderButton from "../Email/email";

const Feed = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type === "SHOW_HABITS");
  const userEmail = useSelector((state) => state.session.user.email);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

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
        <div className="feedTableBox">
          <HabitsIndex />
        </div>
        <div>
          <button onClick={handleClick} className="addBtn">
            + Add Habit
          </button>
          {modalType && <CreateHabit />}
          <ReminderButton userEmail={userEmail} />
        </div>
      </div>
    </div>
  );
};
export default Feed;
