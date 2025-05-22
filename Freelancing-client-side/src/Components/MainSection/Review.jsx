import React from 'react';
import CountUp from "react-countup";

const Review = () => {
    return (
        <div>
            <section className="py-20 bg-white px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-green-700 mb-6 leading-tight">
                            Empowering Freelancers & Task Posters
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Connect with skilled freelancers and find work opportunities tailored to your needs. Whether you're outsourcing a task or offering your expertise, we make freelancing simple and effective.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* All cards with emerald bg and white text */}
                        <div className="bg-emerald-700 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl font-bold text-white mb-3 text-center">
                                <CountUp end={1500} duration={3} />+
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">Tasks Completed</h3>
                        </div>

                        <div className="bg-emerald-700 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl font-bold text-white mb-3 text-center">
                                <CountUp end={500} duration={3} />+
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">Freelancers Registered</h3>
                        </div>

                        <div className="bg-emerald-700 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl font-bold text-white mb-3 text-center">
                                <CountUp end={400} duration={3} />+
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">Clients Served</h3>
                        </div>

                        <div className="bg-emerald-700 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                            <div className="text-5xl font-bold text-white mb-3 text-center">
                                <CountUp end={98} duration={3} />%
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">Positive Ratings</h3>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review;
