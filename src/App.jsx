
import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <>
    <Nav /> 
    <div>
      <MovieCard currentPage={currentPage} setTotalPages={setTotalPages} />
      <Footer
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
    
    
    </>
  
  );
};

export default App;