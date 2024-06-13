import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Depupdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departmentname, setDepartmentname] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1300/departmentsbyid/${id}`);
        const departmentData = response.data;
        setDepartmentname(departmentData.departmentname);
        setYear(departmentData.year);
        setDescription(departmentData.description);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', file); // Use 'image' as the key if it matches your backend's expected key
      formData.append('departmentname', departmentname);
      formData.append('year', year);
      formData.append('description', description);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure correct content type for file upload
        }
      };
  
      await axios.put(`http://localhost:1300/updatedept/${id}`, formData, config);
      navigate('/department');
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/department');
  };

  return (
    <div className='container'> 
      <div className='home-container'>
        <h2>DEP UPDATE FORM</h2>
        <form className='form02'>
          <div className='form-container'>
            <div className='box01'>
              <label htmlFor="departmentname">Department name:</label>
              <input
                type="text"
                id="departmentname"
                name="departmentname"
                value={departmentname}
                onChange={(e) => setDepartmentname(e.target.value)}
              />
            </div>
            <div className='box01'>
              <label htmlFor="year">Year founded:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className='box01'>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='box01'>
              <label htmlFor="profileimage">Profile Image:</label>
              <input
                type="file"
                id="image"
                name="image" 
                onChange={(e) => setFile(e.target.files[0])}
              />
              {/* Display existing image */}
              {/* {department.image && <img src={`http://localhost:1300/images/${department.image}`} alt='Profile' width={'100px'} height={'100px'}/>} */}
            </div>
            <div className='buttons'>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Depupdate;
