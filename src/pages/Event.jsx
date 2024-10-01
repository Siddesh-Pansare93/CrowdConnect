import React, { useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";

const BlogPostCard = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <FaUser className="text-gray-500" />
                    </div>
                    <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap mb-4">
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label="Read more about {post.title}"
                    >
                        Read More
                    </button>
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"
                            }`}
                        aria-label={isLiked ? "Unlike post" : "Like post"}
                    >
                        <FaHeart />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Events = () => {
    const dummyPosts = [
        {
            id: 1,
            title: "The Future of AI in Healthcare",
            author: "Dr. Jane Smith",
            date: "May 15, 2023",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            excerpt: "Exploring the potential impact of artificial intelligence on medical diagnosis and treatment...",
            tags: ["AI", "Healthcare", "Technology"]
        },
        {
            id: 2,
            title: "Sustainable Living: Small Changes, Big Impact",
            author: "Alex Green",
            date: "May 18, 2023",
            imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            excerpt: "Discover how small lifestyle adjustments can lead to significant environmental benefits...",
            tags: ["Sustainability", "Environment", "Lifestyle"]
        },
        {
            id: 3,
            title: "The Rise of Remote Work: Challenges and Opportunities",
            author: "Sarah Johnson",
            date: "May 20, 2023",
            imageUrl: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            excerpt: "Examining the shift towards remote work and its implications for businesses and employees...",
            tags: ["Remote Work", "Business", "Productivity"]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dummyPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Events;