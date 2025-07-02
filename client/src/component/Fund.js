import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
export default function Fund() {
    const { code } = useParams();
    const [fundData, setFundData] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`https://api.mfapi.in/mf/${code}`)
            .then(res => res.json())
            .then(data => setFundData(data))
            .catch(err => console.error(err));

            axios.get('http://localhost:5000/user/saved-funds', {
      headers: {
        Authorization: `${token}`
      }
    }).then(res => {
      const saved = res.data.savedFunds || [];
      const alreadySaved = saved.some(f => f.schemeCode === code);
      setIsSaved(alreadySaved);
    }).catch(err => {
      console.error("Error checking saved funds", err);
    });
    }, [code]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        try {
             await axios.post(
                'http://localhost:5000/user/save-fund',
                {
                    fund: {
                        schemeCode: fundData.meta.scheme_code,
                        schemeName: fundData.meta.scheme_name
                    }
                },
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            );

            setIsSaved(true);
            alert(" Fund saved successfully.");
        } catch (err) {
            console.log(err);
        }
    };


    if (!fundData) return <div className="main-box">Loading...</div>;

    return (
        <div className="page">
            <div className="main-box">
                <h1 className="heading">Fund Details</h1>
                <p><strong>Scheme Name:</strong> {fundData.meta.scheme_name}</p>
                <p><strong>AMC:</strong> {fundData.meta.fund_house}</p>
                <p><strong>Category:</strong> {fundData.meta.scheme_type}</p>
                <p><strong>Last NAV:</strong> {fundData.data[0]?.nav} (as on {fundData.data[0]?.date})</p>
                <button
                    className={`save-button ${isSaved ? 'disabled' : ''}`}
                    onClick={handleSave}
                    disabled={isSaved}
                >
                    {isSaved ? 'Saved' : 'Save Fund'}
                </button>

                <br />
                <Link to="/landing" style={{ color: '#00c6ff', textDecoration: 'underline' }}>← Back to Search</Link>
            </div>
        </div>
    );
}


