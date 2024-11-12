import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";

const TermsAndConditions = () => {
    const [expandedSection, setExpandedSection] = useState("event-registration");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");

    const sections = [
        {
            id: "event-registration",
            title: "Event Registration Policies",
            content: [
                "Registration must be completed at least 48 hours before the event.",
                "Participants must be 18 years or older unless accompanied by a guardian.",
                "Cancellations made within 24 hours of the event are non-refundable.",
                "Event organizers reserve the right to modify event details with prior notice."
            ]
        },
        {
            id: "payment-terms",
            title: "Payment Terms",
            content: [
                "We accept all major credit cards and digital payment methods.",
                "Full payment is required to confirm registration.",
                "Refunds will be processed within 7-10 business days.",
                "Additional service fees may apply for premium events."
            ]
        },
        {
            id: "user-data",
            title: "User Data Handling",
            content: [
                "Personal information is collected in accordance with GDPR guidelines.",
                "Data is encrypted and stored securely on protected servers.",
                "Users can request data deletion at any time.",
                "Event-related communications will be sent to registered email addresses."
            ]
        },
        {
            id: "general-conditions",
            title: "General Conditions",
            content: [
                "Participants must adhere to the event code of conduct.",
                "Photography and recording policies vary by event.",
                "CrowdConnect is not liable for personal belongings.",
                "Terms may be updated with prior notification to users."
            ]
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!agreed) {
            setError("Please agree to the terms and conditions to continue");
            return;
        }
        setError("");
        console.log("Terms accepted");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-white mb-6">Terms and Conditions</h1>
                    <p className="text-gray-300 mb-8">
                        Please read these terms and conditions carefully before using the CrowdConnect event platform.
                    </p>

                    <div className="space-y-4">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className="border border-gray-700 rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => setExpandedSection(expandedSection === section.id ? "" : section.id)}
                                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                                    aria-expanded={expandedSection === section.id}
                                    aria-controls={`content-${section.id}`}
                                >
                                    <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                                    {expandedSection === section.id ? (
                                        <FiChevronUp className="text-gray-300 w-5 h-5" />
                                    ) : (
                                        <FiChevronDown className="text-gray-300 w-5 h-5" />
                                    )}
                                </button>
                                <div
                                    id={`content-${section.id}`}
                                    className={`px-6 py-4 bg-gray-800 transition-all duration-300 ${expandedSection === section.id ? "block" : "hidden"
                                        }`}
                                >
                                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                                        {section.content.map((item, index) => (
                                            <li key={index} className="leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="agree"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-600 rounded bg-gray-700"
                            />
                            <label htmlFor="agree" className="text-gray-300">
                                I have read and agree to the terms and conditions
                            </label>
                        </div>

                        {error && (
                            <div className="mt-4 flex items-center space-x-2 text-red-400">
                                <AiOutlineWarning className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-6 w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                        >
                            Accept Terms
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;