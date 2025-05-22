import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const MyPostedTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch("http://localhost:3000/mytasks", {
            headers: {
                "x-user-email": user.email,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch tasks");
                return res.json();
            })
            .then((data) => {
                setTasks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [user]);

    const handleDelete = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "x-user-email": user.email,
                },
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to delete task");

            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        } catch (err) {
            alert(err.message);
        }
    };

    const openUpdateModal = (task) => {
        setSelectedTask(task);
        document.getElementById("update_modal").showModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedTask((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateSubmit = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/tasks/${selectedTask._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-user-email": user.email,
                    },
                    body: JSON.stringify(selectedTask),
                }
            );
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to update task");

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === selectedTask._id ? selectedTask : task
                )
            );

            alert("Task updated successfully!");
            document.getElementById("update_modal").close();
            setSelectedTask(null);
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <p className="text-center py-10">Loading tasks...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-600">{error}</p>;
    }

    // If no tasks, show centered message
    if (tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <p className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    You haven't posted any tasks yet.
                </p>
                <Link
                    to="/addtask"
                    className="btn bg-emerald-700 text-white px-6 py-3 rounded hover:bg-emerald-800 transition"
                >
                    Add New Task
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-8 text-center text-emerald-700">
                My Posted Tasks
            </h1>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-emerald-200">
                <table className="w-full text-sm text-left rounded-xl overflow-hidden">
                    <thead className="bg-emerald-100 text-emerald-900 text-md">
                        <tr>
                            <th className="p-4 border-b border-emerald-300">Title</th>
                            <th className="p-4 border-b border-emerald-300">Category</th>
                            <th className="p-4 border-b border-emerald-300">Deadline</th>
                            <th className="p-4 border-b border-emerald-300">Status</th>
                            <th className="p-4 border-b border-emerald-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task._id} className="hover:bg-emerald-50 transition">
                                <td className="p-4">{task.title}</td>
                                <td className="p-4">{task.category}</td>
                                <td className="p-4">
                                    {new Date(task.deadline).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-emerald-700 font-medium">
                                    {task.status || "Pending"}
                                </td>
                                <td className="p-4 text-center space-x-2">
                                    <button
                                        onClick={() => openUpdateModal(task)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => alert("View Bids clicked")}
                                        className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md shadow"
                                    >
                                        Bids
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <form
                    method="dialog"
                    className="modal-box bg-white max-w-2xl p-6 rounded-xl shadow-xl border border-emerald-200"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateSubmit();
                    }}
                >
                    <h3 className="text-2xl font-semibold text-emerald-700 mb-6">Update Task</h3>

                    {selectedTask && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="title"
                                    value={selectedTask.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    className="input input-bordered w-full rounded-md"
                                    required
                                />
                                <select
                                    name="category"
                                    value={selectedTask.category}
                                    onChange={handleChange}
                                    className="select select-bordered w-full rounded-md"
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="Web development">Web development</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Writing">Writing</option>
                                </select>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={selectedTask.deadline.split("T")[0]}
                                    onChange={handleChange}
                                    className="input input-bordered w-full rounded-md"
                                    required
                                />
                                <input
                                    name="budget"
                                    value={selectedTask.budget}
                                    onChange={handleChange}
                                    placeholder="Budget"
                                    className="input input-bordered w-full rounded-md"
                                    required
                                />
                                <input
                                    name="userName"
                                    value={selectedTask.userName}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 rounded-md"
                                />
                                <input
                                    name="userEmail"
                                    value={selectedTask.userEmail}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 rounded-md"
                                />
                            </div>

                            <textarea
                                name="description"
                                value={selectedTask.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full mt-4 rounded-md"
                                rows="4"
                                required
                            ></textarea>

                            <div className="modal-action mt-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-md"
                                    onClick={() => {
                                        document.getElementById("update_modal").close();
                                        setSelectedTask(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-emerald-600 text-white hover:bg-emerald-700 rounded-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </dialog>
        </div>
    
    );
};

export default MyPostedTasks;
