import React from 'react';
import CountUp from "react-countup";


const Review = () => {
    return (
        <div>
            <section className="py-20 bg-white dark:bg-gray-900 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-6 leading-tight">
                            Empowering Freelancers & Task Posters
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Connect with skilled freelancers and find work opportunities tailored to your needs. Whether you're outsourcing a task or offering your expertise, we make freelancing simple and effective.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Reusable Card */}
                        {[{
                            count: 1500,
                            title: 'Tasks Completed'
                        }, {
                            count: 500,
                            title: 'Freelancers Registered'
                        }, {
                            count: 400,
                            title: 'Clients Served'
                        }, {
                            count: 98,
                            title: 'Positive Ratings',
                            suffix: '%'
                        }].map((item, index) => (
                            <div
                                key={index}
                                className="bg-emerald-700 dark:bg-emerald-800 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
                            >
                                <div className="text-5xl font-bold text-white mb-3 text-center">
                                    <CountUp end={item.count} duration={3} />{item.suffix || '+'}
                                </div>
                                <h3 className="text-xl font-medium text-white text-center">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Review;
