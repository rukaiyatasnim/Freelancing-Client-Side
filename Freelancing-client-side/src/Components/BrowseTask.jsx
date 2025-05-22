import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("http://localhost:3000/tasks");
                if (!res.ok) throw new Error("Failed to fetch tasks.");

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Invalid response from server.");

                setTasks(data.reverse()); // Show newest first
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-8">
            {!error && tasks.length > 0 && (
                <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
                    Browse All Tasks
                </h1>
            )}

            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : tasks.length === 0 ? (
                <div className="text-center py-20 bg-emerald-50 rounded-xl shadow-inner border border-emerald-100">
                    <div className="text-5xl mb-4">🧐</div>
                    <h2 className="text-2xl font-semibold text-emerald-700 mb-2">No Tasks Available</h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        It looks like no tasks have been posted yet. Please check back later or try refreshing the page.
                    </p>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="card bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="card-body p-6 flex flex-col">
                                <h2 className="card-title text-2xl font-semibold mb-2 text-emerald-700">
                                    {task.title}
                                </h2>
                                <p className="mb-1 text-sm font-medium text-gray-600">
                                    Category: <span className="font-normal">{task.category}</span>
                                </p>
                                <p className="mb-1 text-sm font-medium text-gray-600">
                                    Deadline:{" "}
                                    <span className="font-normal">
                                        {task.deadline
                                            ? new Date(task.deadline).toLocaleDateString()
                                            : "N/A"}
                                    </span>
                                </p>
                                <p className="mb-3 text-sm font-medium text-gray-600">
                                    Budget: <span className="font-normal">${task.budget}</span>
                                </p>
                                <p className="mb-3 text-sm font-medium text-gray-600">
                                    Description: <span className="font-normal">{task.description}</span>
                                </p>

                                <button
                                    onClick={() => navigate(`/tasks/${task._id}`)}
                                    className="btn bg-emerald-700 text-white btn-sm self-start"
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
