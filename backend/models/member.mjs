// backend/models/member.mjs
import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: String,
  description: String,
  age: Number,
  imageUrl: String,
  extraDetail: String
});

const Member = mongoose.model('Member', memberSchema);

export const getMembers = async (db) => {
  return await Member.find({});
};

export const addMember = async (db, member) => {
  const newMember = new Member(member);
  return await newMember.save();
};

export const deleteMember = async (db, id) => {
  return await Member.findByIdAndDelete(id);
};

export const updateMember = async (db, id, updates) => {
  return await Member.findByIdAndUpdate(id, updates, { new: true });
};