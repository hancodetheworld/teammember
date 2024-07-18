// src/redux/membersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const membersSlice = createSlice({
  name: 'members',
  initialState: [],
  reducers: {
    addMember: (state, action) => {
      state.push(action.payload);
    },
    deleteMember: (state, action) => {
      return state.filter(member => member._id !== action.payload);
    },
    setMembers: (state, action) => {
      return action.payload;
    },
  },
});

export const { addMember, deleteMember, setMembers } = membersSlice.actions;
export default membersSlice.reducer;