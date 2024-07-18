// src/components/MemberCard.jsx
import React from 'react';

const MemberCard = ({ member, onDelete }) => {
  return (
    <div>
      <h3>{member.name}</h3>
      <img src={member.imageUrl} alt={member.name} />
      <p>{member.description}</p>
      <p>Age: {member.age}</p>
      <p>{member.extraDetail}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default MemberCard;
