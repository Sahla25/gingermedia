import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        age: '',
        dob: '',
        contact: ''
    });

    useEffect(() => {
        // Fetch user details
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profile');
                setUserDetails(response.data);
            } catch (error) {
                console.error(error.response.data);
            }
        };
        fetchUserDetails();
    }, []);

    const handleEdit = () => {
        setEditedDetails({
            age: userDetails.age || '',
            dob: userDetails.dob || '',
            contact: userDetails.contact || ''
        });
        setEditMode(true);
    };

    const handleChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3001/profile', editedDetails);
            setEditMode(false);
            // Refresh user details
            const response = await axios.get('http://localhost:3001/profile');
            setUserDetails(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            {userDetails && (
                <div>
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    {editMode ? (
                        <form onSubmit={handleSubmit}>
                            <input type="number" name="age" value={editedDetails.age} onChange={handleChange} placeholder="Age" />
                            <input type="date" name="dob" value={editedDetails.dob} onChange={handleChange} placeholder="Date of Birth" />
                            <input type="text" name="contact" value={editedDetails.contact} onChange={handleChange} placeholder="Contact" />
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <p>Age: {userDetails.age}</p>
                            <p>Date of Birth: {userDetails.dob}</p>
                            <p>Contact: {userDetails.contact}</p>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
