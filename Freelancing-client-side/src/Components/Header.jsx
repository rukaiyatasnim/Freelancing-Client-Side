import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-hot-toast';
import defaultUserImage from "../assets/user.jpg";

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("You logged out successfully!");
            })
            .catch((error) => {
                toast.error("Error logging out! Please try again.");
            });
    };

    const links = (
        <>
            <li className='m-2'>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-700 dark:border-emerald-400"
                            : "hover:text-emerald-600 dark:hover:text-emerald-400"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li className='m-2'>
                <NavLink
                    to="/addtask"
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-700 dark:border-emerald-400"
                            : "hover:text-emerald-600 dark:hover:text-emerald-400"
                    }
                >
                    Add Task
                </NavLink>
            </li>
            <li className='m-2'>
                <NavLink
                    to="/browsetask"
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-700 dark:border-emerald-400"
                            : "hover:text-emerald-600 dark:hover:text-emerald-400"
                    }
                >
                    Browse Tasks
                </NavLink>
            </li>
            <li className='m-2'>
                <NavLink
                    to="/myPostedTask"
                    className={({ isActive }) =>
                        isActive
                            ? "text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-700 dark:border-emerald-400"
                            : "hover:text-emerald-600 dark:hover:text-emerald-400"
                    }
                >
                    My Posted Tasks
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 dark:bg-gray-900 text-black dark:text-white shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-emerald-700 dark:text-emerald-400">Hirero</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {/* Theme Toggle */}
                <label className="swap swap-rotate">
                    <input type="checkbox" className="theme-controller" value="dark" />

                    {/* Sun icon (your large detailed SVG) */}
                    <svg className="swap-off w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="#1D1D1B"
                    >
                        <g>
                            <g>
                                <path d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z 
                 M256,336 c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z 
                 M256,112 c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z 
                 M256,400 c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z 
                 M380.438,154.167 l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625
                 S374.188,160.417,380.438,154.167z 
                 M131.562,357.834 l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0 l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625
                 C147.938,351.583,137.812,351.562,131.562,357.834z 
                 M112,256 c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z 
                 M448,240 h-32 c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z 
                 M131.541,154.167 c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0
                 c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z 
                 M380.459,357.812 c-6.271-6.25-16.376-6.25-22.625,0 c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625 c6.249,6.25,16.374,6.25,22.624,0
                 s6.25-16.375,0-22.625L380.459,357.812z"/>
                            </g>
                        </g>
                    </svg>

                    {/* Moon icon */}
                    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.75 15.5a8.25 8.25 0 01-11.82-11.82 10.25 10.25 0 1011.82 11.82z" />
                    </svg>
                </label>


                {/* User Profile */}
                {user && (
                    <div className="relative">
                        <img
                            src={user.photoURL || defaultUserImage}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black text-white p-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                            {user.displayName}
                        </div>
                    </div>
                )}

                {/* Auth Buttons */}
                {
                    user ? (
                        <button onClick={handleLogOut} className='btn bg-emerald-700 hover:bg-emerald-800 text-white'>
                            Logout
                        </button>
                    ) : (
                        <Link to="/auth/login" className="btn bg-emerald-700 hover:bg-emerald-800 text-white">
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Header;
