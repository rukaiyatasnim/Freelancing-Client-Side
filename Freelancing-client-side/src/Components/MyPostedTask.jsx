import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../Provider/AuthProvider';

const MyPostedTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        setLoading(true);
        fetch(`http://localhost:3000/tasks`, {
            headers: {
                "x-user-email": user.email,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch tasks');
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

    const handleUpdate = (taskId) => {
        navigate(`/tasks/update/${taskId}`);
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "x-user-email": user.email,
                },
            });
            if (!res.ok) throw new Error('Failed to delete task');

            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        } catch (err) {
            alert(err.message);
        }
    };

    const handleViewBids = (taskId) => {
        navigate(`/tasks/${taskId}/bids`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <p className="text-gray-600 animate-pulse text-lg">Loading your tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }

    if (!tasks.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <p className="text-gray-600 text-lg">You have not posted any tasks yet.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-8">
                <h1 className="text-4xl font-semibold mb-8 text-center text-blue-700">My Posted Tasks</h1>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="border border-gray-300 py-3 px-6 text-left">Title</th>
                                <th className="border border-gray-300 py-3 px-6 text-left">Category</th>
                                <th className="border border-gray-300 py-3 px-6 text-left">Deadline</th>
                                <th className="border border-gray-300 py-3 px-6 text-left">Status</th>
                                <th className="border border-gray-300 py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr
                                    key={task._id}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                                >
                                    <td className="border border-gray-300 py-3 px-6">{task.title}</td>
                                    <td className="border border-gray-300 py-3 px-6">{task.category}</td>
                                    <td className="border border-gray-300 py-3 px-6">
                                        {new Date(task.deadline).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 py-3 px-6">{task.status || 'Pending'}</td>
                                    <td className="border border-gray-300 py-3 px-6 text-center space-x-2">
                                        <button
                                            onClick={() => handleUpdate(task._id)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-sm hover:bg-blue-600 transition"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded-md shadow-sm hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleViewBids(task._id)}
                                            className="bg-blue-700 text-white px-4 py-1 rounded-md shadow-md hover:bg-blue-800 transition"
                                        >
                                            Bids
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPostedTasks;
