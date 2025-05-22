import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-hot-toast';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("You logged out successfully!");  // Show success toast
            })
            .catch((error) => {
                toast.error("Error logging out! Please try again.", error);  // Show error toast
            });
    };

    const links = (
        <>
            <li className='m-2'>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-stone-800 font-semibold border-b-2 border-stone-800"
                            : ""
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
                            ? "text-stone-800 font-semibold border-b-2 border-stone-800"
                            : ""
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
                            ? "text-stone-800 font-semibold border-b-2 border-stone-800"
                            : ""
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
                            ? "text-stone-800 font-semibold border-b-2 border-stone-800"
                            : ""
                    }
                >
                    My Posted Tasks
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Hirero</a>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-4">
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
                {
                    user ? (
                        <button onClick={handleLogOut} className='btn bg-cyan-500 text-white'>
                            Logout
                        </button>
                    ) : (
                        <Link to="/auth/login" className="btn bg-emerald-700 text-white">
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Header;