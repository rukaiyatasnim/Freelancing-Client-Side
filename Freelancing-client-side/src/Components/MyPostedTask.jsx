import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

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
                toast.error(err.message);
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
            toast.success("Task deleted successfully!");
        } catch (err) {
            toast.error(err.message);
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

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="text-4xl font-bold mb-8 text-center text-emerald-700">My Posted Tasks</h1>

            {loading && <p className="text-center py-10">Loading tasks...</p>}
            {error && <p className="text-center py-10 text-red-600">{error}</p>}

            {!loading && tasks.length === 0 && (
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
            )}

            {/* Table for larger screens */}
            <div className="hidden md:block overflow-auto rounded-xl border border-emerald-200 shadow-md">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-emerald-100 text-emerald-900 text-md">
                        <tr>
                            <th className="p-4 border-b border-emerald-300 whitespace-nowrap">Title</th>
                            <th className="p-4 border-b border-emerald-300 whitespace-nowrap">Category</th>
                            <th className="p-4 border-b border-emerald-300 whitespace-nowrap">Deadline</th>
                            <th className="p-4 border-b border-emerald-300 whitespace-nowrap">Status</th>
                            <th className="p-4 border-b border-emerald-300 text-center whitespace-nowrap">Actions</th>
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
                                <td className="p-4 text-center">
                                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                        <button onClick={() => openUpdateModal(task)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow text-sm">Update</button>
                                        <button onClick={() => handleDelete(task._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow text-sm">Delete</button>
                                        <button onClick={() => toast("View Bids clicked")} className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-md shadow text-sm">Bids</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cards for small screens */}
            <div className="md:hidden flex flex-col gap-6">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white shadow-md rounded-lg border border-gray-200 p-5">
                        <h2 className="text-2xl font-semibold mb-2 text-emerald-700">{task.title}</h2>
                        <p className="text-sm font-medium text-gray-600 mb-1"><strong>Category:</strong> {task.category}</p>
                        <p className="text-sm font-medium text-gray-600 mb-1"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
                        <p className="text-sm font-medium text-gray-600 mb-3"><strong>Status:</strong> {task.status || "Pending"}</p>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => openUpdateModal(task)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow text-sm flex-grow">Update</button>
                            <button onClick={() => handleDelete(task._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow text-sm flex-grow">Delete</button>
                            <button onClick={() => toast("View Bids clicked")} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow text-sm flex-grow">Bids</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <form method="dialog" className="modal-box max-w-2xl p-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateSubmit();
                }}>
                    <h3 className="text-2xl font-semibold text-emerald-700 mb-6">Update Task</h3>
                    {selectedTask && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input name="title" value={selectedTask.title} onChange={handleChange} placeholder="Title" className="input input-bordered w-full" required />
                                <select name="category" value={selectedTask.category} onChange={handleChange} className="select select-bordered w-full" required>
                                    <option value="">Select category</option>
                                    <option value="Web development">Web development</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Writing">Writing</option>
                                </select>
                                <input type="date" name="deadline" value={selectedTask.deadline.split("T")[0]} onChange={handleChange} className="input input-bordered w-full" required />
                                <input name="budget" value={selectedTask.budget} onChange={handleChange} placeholder="Budget" className="input input-bordered w-full" required />
                                <input name="userName" value={selectedTask.userName} readOnly className="input input-bordered bg-gray-100 w-full" />
                                <input name="userEmail" value={selectedTask.userEmail} readOnly className="input input-bordered bg-gray-100 w-full" />
                            </div>
                            <textarea name="description" value={selectedTask.description} onChange={handleChange} className="textarea textarea-bordered w-full mt-4" rows="4" required />
                            <div className="modal-action mt-6 flex justify-end gap-4">
                                <button type="button" className="btn btn-outline btn-error" onClick={() => {
                                    document.getElementById("update_modal").close();
                                    setSelectedTask(null);
                                }}>Cancel</button>
                                <button type="submit" className="btn btn-success">Update</button>
                            </div>
                        </>
                    )}
                </form>
            </dialog>
        </div>
    );
};

export default MyPostedTasks;
