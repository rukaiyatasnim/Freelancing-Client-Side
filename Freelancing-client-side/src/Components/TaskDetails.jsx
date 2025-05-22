import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [bidsCount, setBidsCount] = useState(0);
    const [error, setError] = useState("");
    const userEmail = "user@example.com"; // replace with actual user email

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch(`http://localhost:3000/tasks/${id}`);
                if (!res.ok) throw new Error("Failed to fetch task");
                const data = await res.json();
                setTask(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchBidsCount = async () => {
            try {
                const res = await fetch("http://localhost:3000/bids/count", {
                    headers: { "x-user-email": userEmail },
                });
                if (!res.ok) throw new Error("Failed to fetch bids count");
                const data = await res.json();
                setBidsCount(data.bidsCount);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTask();
        fetchBidsCount();
    }, [id, userEmail]);

    const handleBid = async () => {
        try {
            const res = await fetch("http://localhost:3000/bids", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail, taskId: id }),
            });
            if (!res.ok) throw new Error("Failed to place bid");

            setBidsCount((prev) => prev + 1);
            toast.success("🎉 Your bid has been placed!");
        } catch (err) {
            toast.error(`❌ ${err.message}`);
        }
    };

    if (error)
        return (
            <div className="text-center text-red-600 mt-10 font-semibold">{error}</div>
        );
    if (!task)
        return <div className="text-center mt-10 text-gray-500">Loading task...</div>;

    return (
        <div className="max-w-md mx-auto my-12 p-5 bg-white rounded-xl shadow-md border border-emerald-300">
            <div className="mb-4 bg-emerald-100 border border-emerald-300 rounded-lg p-3 text-center text-emerald-800 font-semibold text-base tracking-wide shadow-sm">
                <span role="img" aria-label="star" className="mr-1">
                    ⭐
                </span>
                You have placed bids for{" "}
                <span className="text-emerald-900 font-bold">{bidsCount}</span>{" "}
                {bidsCount === 1 ? "opportunity" : "opportunities"}.
            </div>

            <h1 className="text-2xl font-extrabold text-emerald-700 mb-4 tracking-tight">
                {task.title}
            </h1>
            <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <p>
                    <strong className="text-emerald-600">Category:</strong>{" "}
                    <span className="font-medium">{task.category}</span>
                </p>
                <p>
                    <strong className="text-emerald-600">Deadline:</strong>{" "}
                    <span className="font-medium">
                        {new Date(task.deadline).toLocaleDateString()}
                    </span>
                </p>
                <p>
                    <strong className="text-emerald-600">Budget:</strong>{" "}
                    <span className="font-medium">${task.budget}</span>
                </p>
                <p>
                    <strong className="text-emerald-600">Description:</strong>{" "}
                    <span className="font-normal">{task.description}</span>
                </p>
            </div>

            <button
                onClick={handleBid}
                className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 flex justify-center items-center gap-2"
            >
                Place Bid
            </button>
        </div>
    );
};

export default TaskDetails;
