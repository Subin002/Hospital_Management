import React, { useState, useRef } from 'react';
import axios from 'axios';
import './headform.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'

function Headform() {
    const [name, setName] = useState('');
    const [employeenumber, setEmployeenumber] = useState('');
    const [age, setAge] = useState('');
    const [file, setFile] = useState(null);
    const [profiledescription, setProfiledescription] = useState('');
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if all fields are filled
        if (!name || !employeenumber || !age || !file || !profiledescription || !department) {
            alert('Please fill all fields');
            return;
        }

        const formData02 = new FormData();
        formData02.append('name', name);
        formData02.append('employeenumber', employeenumber);
        formData02.append('age', age);
        formData02.append('file', file);
        formData02.append('profiledescription', profiledescription);
        formData02.append('department', department);

        try {
            const res = await axios.post('http://localhost:1300/add', formData02);
            console.log('Response from server:', res.data);
            alert('Data submitted successfully');
            // Clear form state and file input field
            setName('');
            setEmployeenumber('');
            setAge('');
            setFile(null);
            setProfiledescription('');
            setDepartment(''); // Removed the comma here
            navigate('/headdata');
        } catch (err) {
            console.error('Error submitting data:', err);
            alert('Failed to submit data. Please try again.');
        }
    };

    const handleShow = (e) => {
        e.preventDefault();
        navigate('/headdata');
    };

    return (
        <div className='container'> 
            <div className='home-container'>
                <h2>DEPARTMENT HEAD FORM</h2>
                <form onSubmit={handleSubmit} className='form02'>
                    <div className='form-container'>
                        <div className='box01'>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='box01'>
                            <label htmlFor="empnumber">Employee No:</label>
                            <input
                                type="number"
                                id="empname"
                                name="empname"
                                value={employeenumber}
                                onChange={(e) => setEmployeenumber(e.target.value)}
                            />
                        </div>
                        <div className='box01'>
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className='box01'>
                            <label htmlFor="image">Profile Image:</label>
                            <input
                                type="file"
                                id="image"
                                name="image" 
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className='box01'>
                            <label htmlFor="profiledescription">Profile Description:</label>
                            <input
                                type="text"
                                id="profiledescription"
                                name="profiledescription"
                                value={profiledescription}
                                onChange={(e) => setProfiledescription(e.target.value)}
                            />
                        </div>
                        <div className='box01'>
                        <label htmlFor="department">Department:</label>
                        <select
                            id="department"
                            name="department"
                            value={department}
                            onChange={(e)=> setDepartment(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Orthology">Orthology</option>
                            <option value="Orthopedic">Orthopedic</option>
                            <option value="Ophthalmologist">Ophthalmologist</option>
                            <option value="Psychiatrist">Psychiatrist</option>

                        </select>
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

export default Headform;
