import React from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
const Contact = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for doesn’t exist or has been moved." />
            </Helmet>

            <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    The contact page you are looking for doesn’t exist or has been moved.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-cyan-800 text-white rounded-full"
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default Contact;