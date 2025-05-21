import React from 'react';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    The page you are looking for doesn’t exist or has been moved.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-cyan-500 text-white rounded-full "
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;