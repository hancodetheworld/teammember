import React from 'react';

const MemberDetail = ({ member, onClose }) => {
  return (
    <div className="memberDetail">
      <h2>{member.name}</h2>
      <p>{member.description}</p>
      <p>Age: {member.age}</p>
      <img src={member.imageUrl} alt={`Photo of ${member.name}`} style={{width: '100px', height: 'auto'}} />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default MemberDetail;