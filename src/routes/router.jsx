import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomeHero from "../components/HomeHero";
import Course from "../pages/AllCourses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../context/PrivateRoute";
import CourseDetails from "../pages/CourseDetails";
import AddCourse from "../layouts/AddCourse";
import MyCourse from "../pages/MyCourse";
import CourseUpdate from "../pages/CourseUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <HomeHero></HomeHero>,
      },
      {
        path: "/courses",
        element: <Course></Course>,
      },
      {
        path: "/course-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/course-details/${params.id}`),
        element: (
          <PrivateRoute>
            <CourseDetails></CourseDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-course/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/update-course/${params.id}`),
        element: (
          <PrivateRoute>
            <CourseUpdate></CourseUpdate>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-course",
        element: (
          <PrivateRoute>
            <MyCourse></MyCourse>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;