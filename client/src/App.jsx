import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar.jsx';
import MemberForm from './components/MemberForm.jsx';
import MemberList from './components/MemberList.jsx';
import { setMembers } from './redux/membersSlice.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('https://teammember-2.onrender.com/api/members');
      const data = await response.json();
      dispatch(setMembers(data));
    };

    fetchMembers();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <h1>Welcome to the Team Builder!</h1>
      <MemberForm />
      <MemberList />
    </div>
  );
}

export default App;