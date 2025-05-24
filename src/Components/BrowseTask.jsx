import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BrowseTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("https://freelancing-crud-server.vercel.app/tasks");
                if (!res.ok) throw new Error("Failed to fetch tasks.");

                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Invalid response from server.");

                setTasks(data.reverse());
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
                    All Shared Tasks
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
                            className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-green-800 mb-2">{task.title}</h2>

                                <div className="text-sm text-gray-600 mb-1">
                                    <strong>Category:</strong> {task.category}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <strong>Deadline:</strong>{" "}
                                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : "N/A"}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <strong>Budget:</strong> ${task.budget}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <strong>Description:</strong> {task.description}
                                </div>
                                <button
                                    onClick={() => navigate(`/tasks/${task._id}`)}
                                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 text-sm rounded shadow mt-5"
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
