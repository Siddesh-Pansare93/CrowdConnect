import  { useState, useEffect } from "react";
import { FaShieldAlt, FaCookieBite, FaUserShield, FaHandshake, FaServer, FaQuestionCircle, FaEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState("");
    const [showConsent, setShowConsent] = useState(true);
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("section");
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sections = [
        {
            id: "data-collection",
            title: "Data Collection",
            icon: <FaShieldAlt className="text-purple-400 text-2xl" />,
            content: "We collect personal information that you voluntarily provide when using our services. This may include your name, email address, and other contact details."
        },
        {
            id: "data-storage",
            title: "Data Storage",
            icon: <FaServer className="text-purple-400 text-2xl" />,
            content: "Your data is securely stored on encrypted servers with regular backups. We implement industry-standard security measures to protect your information."
        },
        {
            id: "cookies",
            title: "Cookies Usage",
            icon: <FaCookieBite className="text-purple-400 text-2xl" />,
            content: "We use cookies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings."
        },
        {
            id: "user-rights",
            title: "User Rights",
            icon: <FaUserShield className="text-purple-400 text-2xl" />,
            content: "You have the right to access, modify, or delete your personal data. Contact us to exercise these rights or file a complaint."
        },
        {
            id: "third-party",
            title: "Third-Party Services",
            icon: <FaHandshake className="text-purple-400 text-2xl" />,
            content: "We may share data with trusted third-party service providers who assist us in operating our website and conducting business."
        },
        {
            id: "contact",
            title: "Contact Information",
            icon: <FaEnvelope className="text-purple-400 text-2xl" />,
            content: "For privacy-related inquiries, please contact our Data Protection Officer at privacy@crowdconnect.com"
        }
    ];

    const handleConsent = () => {
        setIsConsentGiven(true);
        setShowConsent(false);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
                </header>

                <nav className="bg-gray-800 shadow-lg rounded-lg p-4 mb-8" role="navigation" aria-label="Privacy Policy Navigation">
                    <ul className="flex flex-wrap justify-center gap-4">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className={`px-4 py-2 rounded-md transition-colors ${activeSection === section.id ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}
                                >
                                    {section.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <main className="bg-gray-800 shadow-xl rounded-xl p-8">
                    {sections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="mb-12 scroll-mt-24"
                            role="region"
                            aria-labelledby={`${section.id}-title`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                {section.icon}
                                <h2 id={`${section.id}-title`} className="text-2xl font-semibold text-white">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="prose max-w-none text-gray-300">
                                <p>{section.content}</p>
                            </div>
                        </section>
                    ))}
                </main>

                {showConsent && (
                    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-up p-4 border-t border-gray-700">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-gray-300 text-center sm:text-left">
                                By using our website, you agree to our Privacy Policy and Terms of Service.
                            </p>
                            <button
                                onClick={handleConsent}
                                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivacyPolicy;