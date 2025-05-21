import {
    createBrowserRouter,
} from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import HomeLayOut from "../Layout/HomeLayout";
import Main from "../Components/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayOut></HomeLayOut>,
        children: [
            {
                path: '',
                element: <Main></Main>
            },
        ]
    },
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router