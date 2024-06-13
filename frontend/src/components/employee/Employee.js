import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employee.css';
import { Link, useNavigate } from 'react-router-dom';

function Employee() {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:1300/allemp');
            setEmployeeData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employee data:', error);
            setError('Error fetching employee data: ' + error.message);
            setLoading(false);
        }
    };

    const handleDeleteConfirmation = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this Employee?');
        if (isConfirmed) {
            handleDelete(id);
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:1300/deleteemp/${id}`)
            .then(res => {
                setEmployeeData(employeeData.filter(employee => employee._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Employee:', error);
                setError('Error deleting employee: ' + error.message);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (employeeData.length === 0) {
        return <div>No employee data available.</div>;
    }

    return (
        <div>
            <div className='full'>
                <h2>EMPLOYEE DATA</h2>
                <div className='card-container'>
                    {employeeData.map((employee, index) => (
                        <div key={index} className='card'>
                            <img src={`http://localhost:1300/images/${employee.image}`} alt='Profile' width={'100px'} height={'100px'} />
                            <h3>{employee.name}</h3>
                            <p>{employee.employeenumber}</p>
                            <p>{employee.age}</p>
                            <p>{employee.profiledescription}</p>
                            <p>{employee.department}</p>
                            <Link to={`/empupdate/${employee._id}`}><button>Update</button></Link>
                            <button onClick={() => handleDeleteConfirmation(employee._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Employee;
