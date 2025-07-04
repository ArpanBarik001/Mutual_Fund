import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Landing.css';
import Spinner from './Spinner.js';

export default function Landing()  {
  const [funds, setFunds] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  

  useEffect(() => {
    fetch('https://api.mfapi.in/mf')
      .then(res => res.json())
      .then(data => setFunds(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  // Clear any existing timeout
  if (timeoutRef.current) clearTimeout(timeoutRef.current);

  // If input is empty, clear everything
  if (query.trim() === '') {
    setFiltered([]);
    setLoading(false);
    return;
  }

  // Spinner starts immediately on query change
  setLoading(true);

  // Simulate search filtering delay
  timeoutRef.current = setTimeout(() => {
    const results = funds
      .filter(f =>
        f.schemeName.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 20);

    // Set results first
    setFiltered(results);

    // Then stop spinner AFTER a tiny wait (ensures result renders)
    // Optional: this ensures spinner is on screen until UI is ready
    setTimeout(() => {
      setLoading(false);
    }, 100); // 100ms grace period to allow React to render results
  }, 300); // debounce delay
}, [query, funds]);

const handleSearchClick = () => {
  if (query.trim() === '') {
    setFiltered([]);
    setLoading(false);
    return;
  }

  setLoading(true);

  const results = funds
    .filter(f =>
      f.schemeName.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 20);

  setFiltered(results);

  setTimeout(() => {
    setLoading(false);
  }, 100);
};



  const handleSavedFundsClick = () => {
    navigate('/saved');
  };


  return (
    <div className="page">
      <div className="main-box">
        <h1 className="heading">Search Mutual Funds</h1>
        {/* <input
          className="search-input"
          type="text"
          placeholder="Enter fund name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}
        <div className="input-wrapper">
  <input
    className="search-input"
    type="text"
    placeholder="Enter fund name..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button className="search-button" onClick={handleSearchClick}>
    Search
  </button>
</div>

        <ul className="result-list">
          {loading ? (
            <Spinner />
          ) : (
          filtered.map((fund, index) => (
            <li
              className="result-item"
              key={index}
              onClick={() => navigate(`/fund/${fund.schemeCode}`)}
            >
              {fund.schemeName}
            </li>
          ))
          )}
        </ul>
        

      </div>
      <button className="saved-funds-button" onClick={handleSavedFundsClick}>
         View Saved Funds
      </button>
    </div>
  );
}

