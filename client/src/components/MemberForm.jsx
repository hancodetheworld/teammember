// src/components/MemberForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from '../redux/membersSlice';

const MemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    age: '',
    imageUrl: '',
    extraDetail: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newMember = await response.json();
        dispatch(addMember(newMember));
      } else {
        console.error('Failed to add member');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Team Member</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
      <input type="url" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
      <input type="text" name="extraDetail" placeholder="Extra Detail" onChange={handleChange} required />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default MemberForm;