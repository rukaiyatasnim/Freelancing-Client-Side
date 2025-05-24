import React from 'react';
import { Helmet } from 'react-helmet';

const Privacy = () => {
    return (
        <div className="bg-[#f8f9fc] min-h-screen py-14 px-6">
            {/* Add Helmet here for dynamic title */}
            <Helmet>
                <title>Privacy Policy</title>
                <meta name="description" content="This is our Privacy Policy. Your privacy is important to us." />
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 ">Our Privacy Policy</h2>
                    <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
                        Your privacy is important to us. Here's how we handle your data with care and transparency.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-cyan-800">
                        <h3 className="text-xl font-semibold text-cyan-800 mb-2">1. Data We Collect</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We collect personal data such as your name, email, and interactions when you register or engage with our services.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-cyan-800">
                        <h3 className="text-xl font-semibold text-cyan-800 mb-2">2. Why We Collect Your Data</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We use your data to personalize your experience, send event notifications, and improve platform performance.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-cyan-800">
                        <h3 className="text-xl font-semibold text-cyan-800 mb-2">3. Data Security</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We implement strict security measures to ensure your data is safe and protected from unauthorized access.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-cyan-800">
                        <h3 className="text-xl font-semibold text-cyan-800 mb-2">4. Third-Party Services</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We may share information with trusted third-party tools for analytics and functionality. We never sell your data.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
                        <h3 className="text-xl font-semibold text-cyan-800 mb-2">5. Your Rights</h3>
                        <p className="text-gray-700 leading-relaxed">
                            You have full control over your personal information. Contact us to update or remove your data at any time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;