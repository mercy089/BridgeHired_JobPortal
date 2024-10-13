import React from "react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="px-5 lg:px-10 mx-auto flex flex-col space-y-2">
        <div className="flex justify-center space-x-4">
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </Link>
          <Link to="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="text-lg font-semibold">
            &copy;{new Date().getFullYear()} <span>BridgeHired</span>
          </div>
          <div className="text-sm text-center">All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
