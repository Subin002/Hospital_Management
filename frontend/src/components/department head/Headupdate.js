import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Headupdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [employeenumber, setEmployeenumber] = useState('');
    const [age, setAge] = useState('');
    const [file, setFile] = useState(null);
    const [profiledescription, setProfiledescription] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1300/headbyid/${id}`);
                const departmentheadData = response.data;
                setName(departmentheadData.name);
                setEmployeenumber(departmentheadData.employeenumber);
                setAge(departmentheadData.age);
                setProfiledescription(departmentheadData.profiledescription);
                setDepartment(departmentheadData.department);
            } catch (error) {
                console.error('Error fetching department head data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('name', name);
            formData.append('employeenumber', employeenumber);
            formData.append('age', age);
            formData.append('profiledescription', profiledescription);
            formData.append('department', department);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            await axios.put(`http://localhost:1300/updatehead/${id}`, formData, config);
            navigate('/headdata');
        } catch (error) {
            console.error('Error updating department head:', error);
        }
    };


    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/headdata');
    };

    return (
        <div className='container'>
            <div className='home-container'>
                <h2>DEP-HEAD UPDATE FORM</h2>
                <form className='form02'>
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
                                id="empnumber"
                                name="empnumber"
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
                                onChange={(e) => setDepartment(e.target.value)}
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
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Headupdate;
