import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [bidsCount, setBidsCount] = useState(0);
    const [error, setError] = useState("");
    const userEmail = "user@example.com"; // Replace with actual logged-in user's email

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
        return (
            <div className="text-center mt-10 text-gray-500 animate-pulse">
                Loading task...
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto my-14 px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="mb-5 bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-lg text-sm text-center">
                🎯 You have placed{" "}
                <span className="font-semibold text-emerald-900">
                    {bidsCount}
                </span>{" "}
                {bidsCount === 1 ? "bid" : "bids"} so far.
            </div>

            <h1 className="text-3xl font-bold text-emerald-700 mb-4">
                {task.title}
            </h1>

            <div className="space-y-3 text-sm text-gray-700">
                <p>
                    <span className="font-semibold text-emerald-600">Category:</span>{" "}
                    {task.category}
                </p>
                <p>
                    <span className="font-semibold text-emerald-600">Deadline:</span>{" "}
                    {new Date(task.deadline).toLocaleDateString()}
                </p>
                <p>
                    <span className="font-semibold text-emerald-600">Budget:</span> $
                    {task.budget}
                </p>
                <p>
                    <span className="font-semibold text-emerald-600">Shared By:</span>{" "}
                    {task.userName || task.userEmail || "Anonymous"}
                </p>
                <p className="pt-2 text-base leading-relaxed">
                    <span className="block text-emerald-600 font-semibold mb-1">
                        Description:
                    </span>
                    {task.description}
                </p>
            </div>

            <button
                onClick={handleBid}
                className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300 text-center"
            >
                🚀 Place Your Bid
            </button>
        </div>
    );
};

export default TaskDetails;
