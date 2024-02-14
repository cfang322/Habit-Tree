import HabitsIndex from "../Habits/HabitsIndex";
import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../store/reducers/modals";

import CreateHabit from "../Habits/CreateHabit";
import "./Feed.css";
import { useEffect } from "react";
import { fetchHabits } from "../../store/reducers/habits";

const Feed = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.type === "SHOW_HABITS");

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault;
    dispatch(modalActions.showModal("SHOW_HABITS"));
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (

    <div className="feedPage">
      <div className="feedContainer">
        <div className="feedTableBox">
          <HabitsIndex />
        </div>
        <div>
          <button onClick={handleClick} className="addBtn">
            + Add Habit
          </button>
          {modalType && <CreateHabit />}
        </div>
        <ul className='upperFeedFooter' onClick={scrollToTop}>
          <p className="backToTopP">Back to top</p>
        </ul>
        <ul className='lowerFooter'>
          <p className='footerItem'>Copyright &copy; 2024 Habit Tree</p>
        </ul>
      </div>
    </div>
  );
};
export default Feed;
