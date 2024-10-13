import React from "react";
import { useTheme } from "../components/theme-provider"; // Assuming you have a theme provider for dark mode
import { Link } from "react-router-dom"; // Or use your preferred navigation solution

const Error404Page = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
        
        <Link
          to="/"
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${theme === "dark" ? "bg-white text-gray-900 hover:bg-gray-700" : "bg-gray-900 text-white hover:bg-gray-700"}`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404Page;
