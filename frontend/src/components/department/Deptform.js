import React, { useState } from 'react';
import axios from 'axios';
import './deptform.css';
import { useNavigate } from 'react-router-dom';

function Deptform() {
    const [departmentname, setDepartmentname] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if all fields are filled
        if (!departmentname || !year || !description || !file) {
            alert('Please fill all fields');
            return;
        }

        const formData = new FormData();
        formData.append('departmentname', departmentname);
        formData.append('file', file);
        formData.append('year', year);
        formData.append('description', description);

        try {
            const res = await axios.post('http://localhost:1300/adddepartment', formData);
            console.log('Response from server:', res.data);
            alert('Data submitted successfully');
            // Clear form state and file input field
            setDepartmentname('');
            setYear('');
            setDescription('');
            setFile(null); // Removed the comma here
            navigate('/department');
        } catch (err) {
            console.error('Error submitting data:', err);
            alert('Failed to submit data. Please try again.');
        }
    };

    const handleShow = (e) => {
        e.preventDefault();
        navigate('/department');
    };

    return (
        <div className='container'> 
            <div className='home-container'>
                <h2>DEPARTMENT FORM</h2>
                <form onSubmit={handleSubmit} className='form02'>
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
                        </div>
                        <div className='buttons'>
                            <button type="submit">Submit</button>
                            <button onClick={handleShow}>Show</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Deptform;
