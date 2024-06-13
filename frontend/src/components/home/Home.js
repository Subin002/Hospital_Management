import React from 'react';
import './home.css';
import logo from '../../images/KcnXKXEBi.png'; // Import the logo image using a relative path
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate(); // Use the useNavigate hook for navigation

    const handleDepartment = (e) => {
        e.preventDefault();
        console.log("Department link clicked!");
        navigate('/depform'); // Use navigate function to go to '/depform'
    }

    const handleDepartmentHead = (e) => {
        e.preventDefault();
        console.log("Department Head link clicked!");
        navigate('/headform'); // Use navigate function to go to '/headform'
    }

    const handleEmployee = (e) => {
        e.preventDefault();
        console.log("Employee link clicked!");
        navigate('/empform'); // Use navigate function to go to '/empform'
    }

    const handleContact = (e) => {
        e.preventDefault();
        console.log("Contact link clicked!");
        // Add your logic for handling the contact link click event
    }

    const handleInfo = (e) => {
        e.preventDefault();
        console.log("Info link clicked!");
        // Add your logic for handling the contact link click event
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log("Logout link clicked!");
        navigate('/'); // Use navigate function to go to '/login'
        // Add your logic for handling the logout link click event
    }

    return (
        <div className='container'>
            <div className='navbar'>
                <img src={logo} alt="Logo" className="logo" /> {/* Add the logo image */}
                <h2 className='homeh2'>RNA HOSPITAL</h2>
                <div className='navlink'>
                    <h6 onClick={handleDepartment}>Department</h6>
                    <h6 onClick={handleDepartmentHead}>Department head</h6>
                    <h6 onClick={handleEmployee}>Employee</h6>
                </div>
                <div className='navright'>
                    <h6 onClick={handleContact}>Contact</h6>
                    <h6 onClick={handleInfo}>Info</h6>
                    <h6 onClick={handleLogout}>Logout</h6>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Main;
