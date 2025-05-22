import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Task not found');
                return res.json();
            })
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-lg font-medium text-gray-600 animate-pulse">
                    Loading task details...
                </p>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-lg font-medium text-red-500">Task not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 hover:shadow-blue-500 transition-shadow duration-500">
                {/* Header with blue gradient */}
                <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white shadow-lg">
                    <h1 className="text-4xl font-extrabold tracking-tight">{task.title}</h1>
                    <p className="mt-2 text-blue-200 italic">{task.category}</p>
                </div>

                {/* Description Section */}
                <p className="text-gray-800 text-lg leading-relaxed mb-10">
                    <span className="block mb-2 text-xl font-semibold text-blue-700 border-l-4 border-blue-700 pl-3">
                        Description
                    </span>
                    {task.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-gray-700 text-lg font-semibold">
                    <div>
                        <h3 className="text-blue-600 text-xl mb-1">Deadline</h3>
                        <p className="text-gray-600">{new Date(task.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                        <h3 className="text-blue-600 text-xl mb-1">Budget</h3>
                        <p className="text-gray-600">${task.budget}</p>
                    </div>
                    <div>
                        <h3 className="text-blue-600 text-xl mb-1">Status</h3>
                        <p className="text-gray-600">{task.status || 'Pending'}</p>
                    </div>
                    <div>
                        <h3 className="text-blue-600 text-xl mb-1 font-semibold">Category</h3>
                        <p className="text-gray-600">{task.category}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
