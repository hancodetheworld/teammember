// src/components/MemberList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemberCard from './MemberCard';
import { deleteMember } from '../redux/membersSlice';

const MemberList = () => {
  const members = useSelector(state => state.members);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://teammember-2.onrender.com/api/members/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteMember(id));
      } else {
        console.error('Failed to delete member');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Team Members</h2>
      <div>
        {members.map((member) => (
          <MemberCard key={member._id} member={member} onDelete={() => handleDelete(member._id)} />
        ))}
      </div>
    </div>
  );
};

export default MemberList;