import {
    createBrowserRouter,
} from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import HomeLayOut from "../Layout/HomeLayout";
import Main from "../Components/Main";
import Terms from "../Components/Terms";
import Privacy from "../Components/Privacy";

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
        path: "/terms",
        element: <Terms></Terms>
    },
    {
        path: "/privacy",
        element: <Privacy></Privacy>
    },
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router