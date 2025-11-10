import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../context/PrivateRoute";
import CourseDetails from "../pages/CourseDetails";
import AddCourse from "../layouts/AddCourse";
import MyCourse from "../pages/MyCourse";
import CourseUpdate from "../pages/CourseUpdate";
import PopularCourses from "../components/PopularCourses";
import AllCourses from "../pages/AllCourses";
import CoursesLayouts from "../layouts/CoursesLayouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <PopularCourses></PopularCourses>,
      },
    ],
  },
  {
    path: "/courses",
    element: <CoursesLayouts></CoursesLayouts>,
    children: [
        {
            index: true,
            element: <AllCourses></AllCourses>
        },
      {
        path: "courses/course-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/course-details/${params.id}`),
        element: (
          <PrivateRoute>
            <CourseDetails></CourseDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "courses/update-course/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/update-course/${params.id}`),
        element: (
          <PrivateRoute>
            <CourseUpdate></CourseUpdate>
          </PrivateRoute>
        ),
      },
      {
        path: "courses/add-course",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "courses/my-course",
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