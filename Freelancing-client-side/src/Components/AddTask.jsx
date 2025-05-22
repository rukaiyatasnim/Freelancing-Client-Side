import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../Firebase/firebase.config";
const auth = getAuth(app);

const AddTask = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        deadline: "",
        budget: "",
        userEmail: "",
        userName: "",
    });

    // 🔐 Get user from Firebase Auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData((prev) => ({
                    ...prev,
                    userEmail: user.email,
                    userName: user.displayName || "Anonymous",
                }));
            }
        });

        return () => unsubscribe(); // Cleanup
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/addtask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.insertedId || data.acknowledged) {
            alert(" Task added successfully!");
            setFormData((prev) => ({
                ...prev,
                title: "",
                category: "",
                description: "",
                deadline: "",
                budget: "",
            }));
        } else {
            alert(" Failed to add task.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-base-100 shadow-xl rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">➕ Add New Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form Fields */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        className="input input-bordered w-full"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="category"
                        className="select select-bordered w-full"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option>Web Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                        <option>Marketing</option>
                    </select>
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="textarea textarea-bordered w-full"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="deadline"
                        className="input input-bordered w-full"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="budget"
                        placeholder="Budget"
                        className="input input-bordered w-full"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />

                    {/* Readonly Firebase Email & Name */}
                    <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />

                    <button type="submit" className="btn btn-primary w-full mt-4">
                        ➕ Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
