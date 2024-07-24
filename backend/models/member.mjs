// src/models/member.js
import { ObjectId } from 'mongodb';

export const getMembers = async (db) => {
  return await db.collection('members').find().toArray();
};

export const addMember = async (db, member) => {
  return await db.collection('members').insertOne(member);
};

export const deleteMember = async (db, id) => {
  return await db.collection('members').deleteOne({ _id: new ObjectId(id) });
};

export const updateMember = async (db, id, updates) => {
  return await db.collection('members').updateOne({ _id: new ObjectId(id) }, { $set: updates });
};