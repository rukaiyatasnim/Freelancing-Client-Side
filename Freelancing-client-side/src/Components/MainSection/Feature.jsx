import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Feature = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedTasks = async () => {
            try {
                const res = await fetch("http://localhost:3000/featured-tasks");
                const data = await res.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching featured tasks:", error);
            }
        };
        fetchFeaturedTasks();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
                🌿 Featured Tasks With Nearest Deadlines
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks.map((task) => (
                    <div
                        key={task._id}
                        className="bg-white shadow-md rounded-xl p-6 border border-green-200 hover:shadow-xl transition"
                    >
                        <h3 className="text-xl font-semibold text-green-900 mb-3">
                            {task.title}
                        </h3>
                        <p className="text-green-700 mb-2">
                            {task.description.length > 100
                                ? task.description.slice(0, 100) + "..."
                                : task.description}
                        </p>
                        <p className="text-sm text-green-600 mb-1">
                            <strong>Deadline:</strong>{" "}
                            {new Date(task.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-green-600">
                            <strong>Budget:</strong> ${task.budget}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <button
                    onClick={() => navigate("/browsetask")}
                    className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
                >
                    See More
                </button>
            </div>
        </div>
    );
};

export default Feature;