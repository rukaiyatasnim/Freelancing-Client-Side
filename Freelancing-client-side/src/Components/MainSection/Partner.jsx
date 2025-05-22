import React, { useEffect, useState } from 'react';
import partnerData from '../../../public/Data.json';

const Partner = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        setTestimonials(partnerData);
    }, []);

    return (
        <>
            <div>
                <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
                    Trusted by Organizations and Loved by Freelancers
                </h2>
                <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
                    Our platform has helped hundreds of people connect with talented freelancers and get their tasks done.
                    Whether you're an individual or an organization, you’ll find what you need here.
                </p>
            </div>

            <div className="w-full flex justify-center px-4">
                <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl shadow-lg bg-emerald-700 text-white flex flex-col items-center text-center transition duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Profile Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                            />

                            {/* Testimonial Text */}
                            <p className="italic mb-3">"{item.text}"</p>

                            {/* Author */}
                            <div className="text-sm font-semibold">— {item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Partner;
