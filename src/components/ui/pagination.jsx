export const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 transition-colors duration-300 rounded-full text-sm font-medium ${
          currentPage === 1
            ? "bg-gray-300  dark:bg-gray-700  cursor-not-allowed"
            : "bg-blue-500 dark:bg-blue-700  hover:bg-blue-600"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 rounded-full text-sm font-medium ${
              currentPage === index + 1
                ? "bg-blue-500 dark:bg-blue-700 "
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className={`px-4 py-2 transition-colors duration-300 rounded-full text-sm font-medium ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
