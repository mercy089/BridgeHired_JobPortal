import React from 'react';

const BlogCard = ({ title, excerpt }) => {
  return (
    <div className="transition flex flex-col gap-1 duration-300 bg-gray-300 bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-40 border dark:border-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        <hr className="dark:border-gray-200 border-gray-900 my-2" />
        <p className="mt-2 text-gray-600 dark:text-gray-300">{excerpt}</p>
      </div>
    </div>
  );
};

export default BlogCard;
