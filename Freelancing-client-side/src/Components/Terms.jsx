import React from 'react';
import { Helmet } from 'react-helmet';

const Terms = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            {/* Add Helmet for dynamic title */}
            <Helmet>
                <title>Terms & Conditions</title>
                <meta name="description" content="Read our Terms & Conditions to understand the rules and guidelines for using our platform." />
            </Helmet>

            <div className="text-center mb-10 px-4">
                <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight">
                    Terms & Conditions
                </h2>
                <p className="text-gray-700 max-w-xl mx-auto mt-3 text-lg">
                    Please read these terms carefully before using our platform.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-10 space-y-5">
                {/* Section 1 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        1. Acceptance of Terms
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        By accessing this site, you agree to be bound by these terms and all applicable laws and regulations.
                    </div>
                </div>

                {/* Section 2 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        2. User Responsibilities
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        You are expected to behave respectfully and legally. Misuse of the platform will result in account suspension.
                    </div>
                </div>

                {/* Section 3 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        3. Event Participation
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        We collaborate with event organizers but are not responsible for the outcome, cancellation, or disputes of any event.
                    </div>
                </div>

                {/* Section 4 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        4. Payment and Refund Policy
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        Payments go to the event host. Refunds follow the event’s own policy and are not issued by us directly.
                    </div>
                </div>

                {/* Section 5 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        5. Intellectual Property
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        Content on this site is owned by us or partners. Reuse is prohibited without prior permission.
                    </div>
                </div>

                {/* Section 6 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        6. Privacy Policy
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        We take data privacy seriously. Please refer to our Privacy Policy page for details.
                    </div>
                </div>

                {/* Section 7 */}
                <div tabIndex={0} className="collapse collapse-plus bg-white border border-green-400 rounded-xl shadow-md">
                    <div className="collapse-title text-lg font-semibold text-green-800">
                        7. Modifications
                    </div>
                    <div className="collapse-content text-gray-700 text-base">
                        Terms may change over time. We recommend revisiting this page periodically.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
