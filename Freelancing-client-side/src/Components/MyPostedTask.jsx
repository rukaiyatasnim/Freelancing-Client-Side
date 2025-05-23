import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

const MyPostedTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        if (!user?.email) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const fetchTasks = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch("http://localhost:3000/mytasks", {
                    headers: {
                        "x-user-email": user.email,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch tasks: ${res.status}`);
                }

                const data = await res.json();
                setTasks(data || []);
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [user]);

    const handleDelete = async (taskId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: "#1a202c", // dark background for sweetalert modal
            color: "#fff", // white text
        });

        if (result.isConfirmed) {
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

                await Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success",
                    background: "#1a202c",
                    color: "#fff",
                });
            } catch (err) {
                toast.error(err.message);
            }
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
            const res = await fetch(`http://localhost:3000/tasks/${selectedTask._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-email": user.email,
                },
                body: JSON.stringify(selectedTask),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to update task");

            setTasks((prev) =>
                prev.map((task) => (task._id === selectedTask._id ? selectedTask : task))
            );

            toast.success("Task updated successfully!");
            document.getElementById("update_modal").close();
            setSelectedTask(null);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleShowBids = async (task) => {
        try {
            const res = await fetch(`http://localhost:3000/tasks/${task._id}/bids/count`, {
                headers: {
                    "x-user-email": user.email,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch bids count");

            const data = await res.json();

            toast.success(
                `Task "${task.title}" has ${data.bidsCount} bid${data.bidsCount !== 1 ? "s" : ""}`
            );
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-gray-900">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="text-4xl font-bold mb-8 text-center text-emerald-700 dark:text-emerald-400">
                My Posted Tasks
            </h1>

            {loading && <p className="text-center py-10 text-gray-700 dark:text-gray-300">Loading tasks...</p>}
            {error && <p className="text-center py-10 text-red-600 dark:text-red-400">{error}</p>}

            {!loading && tasks.length === 0 && !error && (
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                    <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">
                        You haven't posted any tasks yet.
                    </p>
                    <Link
                        to="/addtask"
                        className="btn bg-emerald-700 text-white px-6 py-3 rounded hover:bg-emerald-800 dark:hover:bg-emerald-600 transition"
                    >
                        Add New Task
                    </Link>
                </div>
            )}

            {/* Table for larger screens */}
            {!loading && tasks.length > 0 && (
                <div className="hidden md:block overflow-auto rounded-xl border border-emerald-200 dark:border-emerald-700 shadow-md bg-white dark:bg-gray-800">
                    <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        <thead className="bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300 text-md">
                            <tr>
                                <th className="p-4 border-b border-emerald-300 dark:border-emerald-700 whitespace-nowrap">Title</th>
                                <th className="p-4 border-b border-emerald-300 dark:border-emerald-700 whitespace-nowrap">Category</th>
                                <th className="p-4 border-b border-emerald-300 dark:border-emerald-700 whitespace-nowrap">Deadline</th>
                                <th className="p-4 border-b border-emerald-300 dark:border-emerald-700 whitespace-nowrap">Status</th>
                                <th className="p-4 border-b border-emerald-300 dark:border-emerald-700 text-center whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {tasks.map((task) => (
                                <tr
                                    key={task._id}
                                    className="hover:bg-emerald-50 dark:hover:bg-emerald-900 transition"
                                >
                                    <td className="p-4">{task.title}</td>
                                    <td className="p-4">{task.category}</td>
                                    <td className="p-4">{new Date(task.deadline).toLocaleDateString()}</td>
                                    <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">
                                        {task.status || "Pending"}
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                            <button
                                                onClick={() => openUpdateModal(task)}
                                                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-3 py-1 rounded-md shadow text-sm"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white px-3 py-1 rounded-md shadow text-sm"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => handleShowBids(task)}
                                                className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-3 py-1 rounded-md shadow text-sm"
                                            >
                                                Bids
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Cards for small screens */}
            {!loading && tasks.length > 0 && (
                <div className="md:hidden flex flex-col gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 p-5"
                        >
                            <h2 className="text-2xl font-semibold mb-2 text-emerald-700 dark:text-emerald-400">{task.title}</h2>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                                <strong>Category:</strong> {task.category}
                            </p>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                                <strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}
                            </p>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                                <strong>Status:</strong> {task.status || "Pending"}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => openUpdateModal(task)}
                                    className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2 rounded-md shadow text-sm"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white px-4 py-2 rounded-md shadow text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleShowBids(task)}
                                    className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow text-sm"
                                >
                                    Bids
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update modal */}
            <dialog
                id="update_modal"
                className="rounded-lg p-0 max-w-lg w-full border-0 shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
                {selectedTask && (
                    <>
                        <form method="dialog" className="p-6">
                            <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-400">
                                Update Task
                            </h3>

                            <label className="block mb-2 text-sm font-medium">Title</label>
                            <input
                                name="title"
                                type="text"
                                value={selectedTask.title}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium">Category</label>
                            <input
                                name="category"
                                type="text"
                                value={selectedTask.category}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium">Deadline</label>
                            <input
                                name="deadline"
                                type="date"
                                value={new Date(selectedTask.deadline).toISOString().substring(0, 10)}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 mb-4"
                            />

                            <label className="block mb-2 text-sm font-medium">Status</label>
                            <select
                                name="status"
                                value={selectedTask.status || "Pending"}
                                onChange={handleChange}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 mb-4"
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedTask(null);
                                        document.getElementById("update_modal").close();
                                    }}
                                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleUpdateSubmit}
                                    className="px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </dialog>
        </div>
    );
};

export default MyPostedTasks;
