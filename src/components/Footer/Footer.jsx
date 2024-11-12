import { useState } from "react";
import { useSelector } from 'react-redux';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const authStatus = useSelector((state) => state.auth.status); // Getting auth status from Redux store

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail) {
      console.log("Subscribed with email:", email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white sticky z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">Join Our Community Today!</h2>
          <p className="mb-4">Get exclusive access to our latest updates and offers.</p>
          <a href={authStatus ? "/about" : "/signup"}>
            <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-2xl hover:bg-blue-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              {authStatus ? "Contact Us" : "Sign Up Now"}
            </button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <p className="mb-4">We are a forward-thinking company dedicated to Connect with Crowd and excellence in technology solutions.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Information</h3>
            <p className="mb-2">Email: crowdconnect2024@gmail.com</p>
            <p className="mb-2">Phone: +91 87792 00752</p>
            <p>Kisan Nagar, Silicon, Thane 400 604</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe Now</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className={`w-full px-3 py-2 placeholder-gray-500 border ${isValidEmail ? 'border-gray-600' : 'border-red-500'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-800 text-white`}
                  required
                />
                {!isValidEmail && <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-2xl"
                disabled={!isValidEmail}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-sm text-gray-400">
          <p>&copy; 2024 CrowdConnect. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white transition duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition duration-300">
              Terms and Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
