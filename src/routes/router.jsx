import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomeHero from "../components/HomeHero";
import Course from "../pages/Course";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                element: <HomeHero></HomeHero>
            },
            {
                path: 'courses',
                element: <Course></Course>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])

export default router;