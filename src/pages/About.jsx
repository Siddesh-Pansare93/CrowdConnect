import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { FaUsers, FaCalendarAlt, FaComments, FaStar, FaGithub, FaLinkedin } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import images
import sumit from '../assets/sumit.jpg'; 
import dinya from '../assets/Dinya.jpg';
import siddesh from '../assets/siddesh.jpg';
import ashmit from '../assets/dp.jpg'

const About = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.send('service_o1k03ot', 'template_jc873aq', formData, 'fbxLzbBncfCIVbQwF')
            .then((response) => {
                console.log('Email sent successfully:', response);
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
                alert("Your message has been sent!");
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert("There was an error sending your message. Please try again later.");
            });
    };

    const features = [
        { icon: <FaUsers />, title: "Connect with Like-minded People", description: "Find and meet people who share your interests" },
        { icon: <FaCalendarAlt />, title: "Organize Events", description: "Create and manage events effortlessly" },
        { icon: <FaComments />, title: "Group Discussions", description: "Engage in meaningful conversations with community members" }
    ];

    const testimonials = [
        { name: "John Doe", content: "CrowdConnect has revolutionized how I network and make new friends!" },
        { name: "Jane Smith", content: "I've found amazing communities and events through this platform. Highly recommended!" },
        { name: "Mike Johnson", content: "The ease of organizing meetups on CrowdConnect is unparalleled. Great job!" }
    ];

    const teamMembers = [
        {
            name: "Sumit Singh",
            role: "Front-End Developer",
            image: sumit,
            github: "https://github.com/18-sumit",
            linkedin: "https://www.linkedin.com/in/sumit-singh-721aa1254/"
        },
        {
            name: "Siddesh Pansare",
            role: "Full-Stack Developer",
            image: siddesh,
            github: "https://github.com/Siddesh-Pansare93",
            linkedin: "https://www.linkedin.com/in/siddesh-pansare-537a322ab/"
        },
        {
            name: "Ashmit Singh",
            role: "Full-Stack Developer",
            image: ashmit,
            github: "https://github.com/Ashmit111",
            linkedin: "https://www.linkedin.com/in/ashmit-singh-768456257/"
        },
        {
            name: "Sumit Singh",
            role: "Python Developer",
            image: dinya,
            github: "https://github.com/suuummiiit/",
            linkedin: "https://www.linkedin.com/in/suuummiiit/"
        }
    ];

    return (
        <div className="bg-black-200 text-white min-h-screen">
            {/* Header Section */}
            <header className="relative h-96 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">CrowdConnect</h1>
                </div>
            </header>

            {/* Introduction Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-semibold mb-6 text-center">Welcome to CrowdConnect</h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center">
                    CrowdConnect is a platform designed to bring people together, fostering meaningful connections and vibrant communities. We believe in the power of shared interests and experiences to create lasting relationships.
                </p>
            </section>

            {/* Key Features Section */}
            <section className="bg-gray-800 py-16">
                <div className="container mx-auto px-4 ">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-xl shadow-md transition-transform hover:scale-105">
                                <div className="text-4xl text-blue-400 mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold mb-12 text-center">What Our Users Say</h2>
                    <Carousel
                        showArrows={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        showStatus={false}
                        autoPlay={true}
                        interval={5000}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg mx-4 my-2">
                                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                                <p className="font-semibold text-blue-400">{testimonial.name}</p>
                                <div className="flex justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 mx-1" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transition-transform hover:scale-105">
                                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-gray-300">{member.role}</p>
                                <div className="flex justify-center mt-4 space-x-4">
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                        <FaGithub size={24} />
                                    </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                        <FaLinkedin size={24} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Get in Touch</h2>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-600 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 "

                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-600 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block mb-2 font-semibold">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-600 rounded-2xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-600 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default About;
