// src/components/SavedFunds.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/SavedFunds.css';

const SavedFunds = () => {
  const [savedFunds, setSavedFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // 🔐 redirect if not logged in
      return;
    }

    axios.get('https://mutual-fund-backend-nbnb.onrender.com/user/saved-funds', {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(res => {
        setSavedFunds(res.data.savedFunds || []);
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg(' Failed to load saved funds.');
        setLoading(false);
      });
  }, [navigate]);

  const handleDelete = async (schemeCode) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://mutual-fund-backend-nbnb.onrender.com/user/delete-fund/${schemeCode}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // 🧹 Remove from UI
      setSavedFunds(prev => prev.filter(f => f.schemeCode !== schemeCode));
    } catch (err) {
      console.error('Delete failed', err);
      setErrorMsg('Failed to delete fund.');
    }
  };


  return (
    <div className="saved-page">
      <div className="saved-box">
        <h2 className="saved-heading">Your Saved Mutual Funds</h2>

        {loading && <p>Loading...</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}

        {!loading && savedFunds.length === 0 && (
          <p className="no-funds">You haven't saved any funds yet.</p>
        )}

        <ul className="fund-list">
          {savedFunds.map((fund, index) => (
            <li key={index} className="fund-item">
              <Link to={`/fund/${fund.schemeCode}`}>
                {fund.schemeName}
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(fund.schemeCode)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <Link to="/landing" className="back-link">← Back to Search</Link>
      </div>
    </div>
  );
};

export default SavedFunds;
