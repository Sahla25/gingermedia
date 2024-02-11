// frontend/src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: '',
        dob: '',
        contact: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', formData);
            console.log(response.data);
            // Redirect to login page
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
