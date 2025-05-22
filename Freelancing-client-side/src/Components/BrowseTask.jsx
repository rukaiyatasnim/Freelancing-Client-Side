import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/tasks")
            .then((res) => res.json())
            .then(setTasks)
            .catch(console.error);
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Browse All Tasks</h1>

            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="card bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="card-body p-6 flex flex-col">
                                <h2 className="card-title text-2xl font-semibold mb-2 text-indigo-700">
                                    {task.title}
                                </h2>

                                <p className="mb-1 text-sm font-medium text-gray-600">
                                    Category: <span className="font-normal">{task.category}</span>
                                </p>
                                <p className="mb-1 text-sm font-medium text-gray-600">
                                    Deadline:{" "}
                                    <span className="font-normal">
                                        {new Date(task.deadline).toLocaleDateString()}
                                    </span>
                                </p>
                                <p className="mb-3 text-sm font-medium text-gray-600">
                                    Budget: <span className="font-normal">${task.budget}</span>
                                </p>

                                <p className="text-gray-700 flex-grow mb-6 line-clamp-4">
                                    {task.description}
                                </p>

                                <button
                                    onClick={() => navigate(`/tasks/${task._id}`)
                                    }
                                    className="btn btn-primary btn-sm self-start"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowseTasks;
