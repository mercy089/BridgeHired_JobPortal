import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; // Importing social media icons and the home icon
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="px-5 lg:px-10 mx-auto flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="text-lg font-semibold">
              &copy;{new Date().getFullYear()} <span>BridgeHired</span>
            </div>
          </Link>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
        <div className="text-sm text-center">All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
