import React, { useState } from 'react';
import blogs from '../data/blogs.json'; // Assuming blogs.json is your data source
import { Pagination } from '@/components/ui/pagination'; // Import your custom Pagination component
import BlogCard from '@/components/BlogCard';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 6; // Number of blogs per page

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage; // Starting index for the current page
  const paginatedBlogs = blogs.slice(startIndex, startIndex + itemsPerPage); // Extract the blogs for the current page

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div className="p-10 flex flex-col">
      <h1 className="text-7xl text-center font-bold mb-8">Blog Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} excerpt={blog.excerpt} />
        ))}
      </div>

      {/* Pagination Component */}
      {blogs.length > itemsPerPage && (
        <div className="mt-4">
          <Pagination
            totalItems={blogs.length} // Total number of blogs
            currentPage={currentPage} // Current page state
            itemsPerPage={itemsPerPage} // Items per page
            onPageChange={handlePageChange} // Function to handle page change
          />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
