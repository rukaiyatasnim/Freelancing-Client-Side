import {
    createBrowserRouter,
} from "react-router-dom"; // ✅ use react-router-dom
import ErrorPage from "../Pages/ErrorPage";
import HomeLayOut from "../Layout/HomeLayout";
import Main from "../Components/Main";
import Terms from "../Components/Terms";
import Privacy from "../Components/Privacy";
import AuthLayOut from "../Layout/AuthLayout";
import Login from "../Pages/Login";
import Register from './../Pages/Register';
import AddTask from "../Components/AddTask";
import PrivateRoute from './../Provider/PrivateRoute';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayOut />, // ✅ This will wrap all children with Header/Footer
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Main />
            },
            {
                path: 'addtask',
                element: (
                    <PrivateRoute>
                        <AddTask />
                    </PrivateRoute>
                )
            },
            {
                path: 'browseTask',
                element: (
                    <PrivateRoute>
                        <AddTask />
                    </PrivateRoute>
                )
            },
            {
                path: 'myPostedTask',
                element: (
                    <PrivateRoute>
                        <AddTask />
                    </PrivateRoute>
                )
            },
            {
                path: 'terms',
                element: <Terms />
            },
            {
                path: 'privacy',
                element: <Privacy />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayOut />,
        children: [
            {
                path: "login", 
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;
