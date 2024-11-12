// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation(); // Access the current route location

    useEffect(() => {
        // Scroll to the top whenever the route changes
        window.scrollTo(0, 0);
    }, [location]); // This effect runs whenever the location changes (i.e., route changes)

    return null; // This component doesn't render anything to the UI
};

export default ScrollToTop;
