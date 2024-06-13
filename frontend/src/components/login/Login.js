import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emailid: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.emailid || !formData.password) {
            alert('Please fill all fields');
            return;
        }
        console.log('Form submitted with data:', formData);

        axios.post('http://localhost:1300/post', formData)
            .then((res) => {
                console.log(res.data);
                alert('Login successful');
                setFormData({
                    emailid: '',
                    password: ''
                });
                // Redirect to '/home' after successful login
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='container'>
            <div className='home-container'>
                <h2 className='title'>RNA HOSPITAL</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-container'>
                        <div className='box01'>
                            <label htmlFor="employeeid">Email ID:</label>
                            <input
                                type="text"
                                id="emailid"
                                name="emailid"
                                value={formData.emailid}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='box01'>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;
