import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { getCurrentUser } from "./store/reducers/session";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

import MainPage from "./components/MainPage/MainPage";
// import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import Feed from "./components/Feed/feed";
import NotesIndex from "./components/Notes/NotesIndex";
import NoteIndexItem from "./components/Notes/NoteIndexItem";
import HabitsIndexItem from "./components/Habits/HabitsIndexItem";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import AboutUs from "./components/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <AuthRoute component={MainPage} />,
      },

      {
        path: "signup",
        element: <AuthRoute component={SignupForm} />,
      },
      {
        path: "feed",
        element: (
          <>
            <ProtectedRoute component={NavBar} />
            <ProtectedRoute component={Feed} />,
          </>
        ),
      },
      {
        path: "/habits/:habitId",
        element: (
          <>
            <ProtectedRoute component={NavBar} />
            <ProtectedRoute component={HabitsIndexItem} />,
          </>
        ),
      },
      {
        path: "notes",
        element: <ProtectedRoute component={NotesIndex} />,
      },
      {
        path: "notes/:habitId",
        element: <ProtectedRoute component={NoteIndexItem} />,
      },
      {
        path: "profile",
        element: <ProtectedRoute component={Profile} />,
      },
      {
        path: "about-us",
        element: (
          <>
            <ProtectedRoute component={NavBar} />
            <ProtectedRoute component={AboutUs} />,
          </>
        ),
      },
    ],
  },
]);

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).finally(() => setLoaded(true));
  }, [dispatch]);

  return loaded && <RouterProvider router={router} />;
}

export default App;
