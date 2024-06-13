import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './department.css';
import { Link, } from 'react-router-dom';

function Department() {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1300/getdepartment');
        setDepartmentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching department data:', error);
        setError('Error fetching department data: ' + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDeleteConfirmation = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this department?');
    if (isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1300/deletedept/${id}`)
      .then(res => {
        setDepartmentData(departmentData.filter(department => department._id !== id));
      })
      .catch(error => console.error('Error deleting department:', error));
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
        <h2>DEPARTMENT DATA</h2>
        <div className='card-container'>
          {departmentData.map((department, index) => (
            <div key={index} className='card'>
              <h3>{department.departmentname}</h3>
              <p>{department.year}</p>
              <img src={`http://localhost:1300/images/${department.image}`} alt='Profile' width={'100px'} height={'100px'}/>
              <p>{department.description}</p>
              {/* Link to update department */}
              <Link to={`/depupdate/${department._id}`}><button>Update</button></Link>
              <button onClick={() => handleDeleteConfirmation(department._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Department;
