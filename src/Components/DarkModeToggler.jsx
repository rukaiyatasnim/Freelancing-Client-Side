import React, { useContext } from 'react';
import ThemeContext from "../Context/ThemeContext" 
const DarkModeToggler = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default DarkModeToggler;
