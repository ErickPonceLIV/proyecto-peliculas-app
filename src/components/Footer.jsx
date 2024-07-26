import React, { useState, useEffect } from 'react';


const Footer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page = 1) => {
    try {
      const url = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${url}&page=${page}`
      );
      const data = await response.json();
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center space-x-4 p-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Footer;