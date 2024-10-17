import React, { useCallback, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi"; // Import spinner icon
import authService from "@/Backend/Appwrite/auth";
import { logout } from "@/store/Features/authSlice";

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

const Home = () => {
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleGetStarted = useCallback(() => {
        navigate("/signup");
    }, [navigate]);

    const handleExploreEvents = useCallback(() => {
        navigate("/allevents");
    }, [navigate]);

    // Touch event handling for smooth scrolling
    useEffect(() => {

        const checkIsLoggedIn = async () => {
            try {
                const user = await authService.getCurrentUser()
                console.log(user)
                // if (!user) {
                //     dispatch(logout())
                // }
            } catch (error) {
                dispatch(logout())
            }

        }

        checkIsLoggedIn()



        
    }, []);

    // Spinner component for loading fallback
    const Spinner = () => (
        <div className="flex items-center justify-center min-h-screen mb-32">
            <FiLoader className="animate-spin text-white text-5xl mb-32" />
        </div>
    );

    return (
        <main className="relative flex items-center justify-center min-h-screen bg-black">
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
                    className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-100"
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
