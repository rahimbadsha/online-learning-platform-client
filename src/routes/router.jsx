import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import HomeHero from "../components/HomeHero";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                element: <HomeHero></HomeHero>
            }
        ]
    }
])

export default router;