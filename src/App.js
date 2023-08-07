import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState("brijesh");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchUser = useCallback(async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}&page=${currentPage}`);
      const responseData = await response.json();
      setData(responseData.items);
      const linkHeader = response.headers.get('Link');
      if (linkHeader) {
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (totalPagesMatch) {
          setTotalPages(parseInt(totalPagesMatch[1], 10));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [username, currentPage]);

  useEffect(() => {
    searchUser();
  }, [username, searchUser]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='page'>
      <center><h2>Search GitHub Users by Username</h2></center>
      <input
        className='input_field'
        type="text"
        placeholder='Search for a user'
        name='user'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className='users'>
        {Array.isArray(data) && data.map((elem, index) => (
          <div className='user_box' key={elem.id}>
            <img src={elem.avatar_url} width={80} height={80} alt='profile' /> <br />
            {elem.login} <br />
            <button><a href={elem.html_url} style={{ textDecoration: 'none' }}>Visit Profile</a></button>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
    </div>
  );
}

export default App;
