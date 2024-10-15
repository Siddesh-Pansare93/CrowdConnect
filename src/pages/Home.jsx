import React, { useCallback, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi"; // Import spinner icon

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

const Home = () => {
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();

    const handleGetStarted = useCallback(() => {
        navigate("/signup");
    }, [navigate]);

    const handleExploreEvents = useCallback(() => {
        navigate("/allevents");
    }, [navigate]);

    // Touch event handling for smooth scrolling
    useEffect(() => {
        let startY;
        let scrollY = window.scrollY;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const currentY = e.touches[0].clientY;
            const diffY = startY - currentY;
            window.scrollTo(0, scrollY + diffY);
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // Spinner component for loading fallback
    const Spinner = () => (
        <div className="flex items-center justify-center min-h-screen">
            <FiLoader className="animate-spin text-white text-4xl" />
        </div>
    );

    return (
        <main className="relative flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 z-0 w-full h-full">
                <Suspense fallback={<Spinner />}>
                    <Spline
                        scene="https://prod.spline.design/utSEViqSzdzDIZVl/scene.splinecode"
                        className="w-full h-full object-cover sm:pointer-events-auto pointer-events-none sm:z-1 z-0" // Apply Tailwind classes
                        style={{ zIndex: 1 }}
                    />
                </Suspense>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold">CrowdConnect</h1>
                <p className="mt-4 text-lg">Connecting people for better events.</p>
                <motion.button
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    onClick={authStatus ? handleExploreEvents : handleGetStarted}
                >
                    {authStatus ? "Explore Events" : "Get Started"}
                </motion.button>
            </div>
        </main>
    );
};

export default Home;
