import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Head() {
  const [departmentheadData, setDepartmentheadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1300/all');
        setDepartmentheadData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching department head data:', error);
        setError('Error fetching department head data: ' + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/headupdate/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this department head?');
    if (isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1300/deletehead/${id}`)
      .then(res => {
        setDepartmentheadData(prevData => prevData.filter(head => head._id !== id));
      })
      .catch(error => console.error('Error deleting department head:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className='full'>
        <h2>DEPARTMENT HEAD DATA</h2>
        <div className='card-container'>
          {departmentheadData.map((head, index) => (
            <div key={index} className='card'>
              <img src={`http://localhost:1300/images/${head.image}`} alt='Profile' width={'100px'} height={'100px'} />
              <h3>{head.name}</h3>
              <p>{head.employeenumber}</p>
              <p>{head.age}</p>
              <p>{head.profiledescription}</p>
              <p>{head.department}</p>
              <button onClick={() => handleUpdate(head._id)}>Update</button>
              <button onClick={() => handleDeleteConfirmation(head._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Head;
