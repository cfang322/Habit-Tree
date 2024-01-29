import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

import MainPage from "./components/MainPage/MainPage";
// import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import Feed from "./components/Feed/Feed";
import NotesIndex from "./components/Notes/NotesIndex";

import { getCurrentUser } from "./store/reducers/session";

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
        element: <ProtectedRoute component={Feed} />,
      },
      {
        path: "notes",
        element: <ProtectedRoute component={NotesIndex} />,
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
