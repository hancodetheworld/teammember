// backend/server/server.mjs
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.mjs';
import { getMembers, addMember, deleteMember, updateMember } from '../models/member.mjs';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let db;

const initialData = [
  {
    name: 'HAN',
    description: 'student',
    age: 22,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA8GODfBsuHylhyd6SN7ehxW2T3FAh1frqzg&s',
    extraDetail: 'Extra detail about HAN'
  },
  // 你可以添加更多初始数据
];

const initializeDatabase = async (db) => {
  const members = await getMembers(db);
  if (members.length === 0) {
    await Promise.all(initialData.map(member => addMember(db, member)));
    console.log('Initial data has been added to the database.');
  }
};

connectDB().then(database => {
  db = database;
  initializeDatabase(db); // 初始化数据库
}).catch(err => {
  console.error('Error connecting to database:', err);
});

app.get('/api/members', async (req, res) => {
  try {
    const members = await getMembers(db);
    res.json(members);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/members', async (req, res) => {
  try {
    const newMember = req.body;
    console.log('Received new member:', newMember); // 调试信息
    const result = await addMember(db, newMember);
    console.log('Insert result:', result); // 调试信息
    const insertedMember = await db.collection('members').findOne({ _id: result.insertedId });
    res.status(201).json(insertedMember);
  } catch (err) {
    console.error('Error adding member:', err); // 错误日志
    res.status(500).send('Server Error');
  }
});

app.delete('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMember(db, id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting member:', err); // 错误日志
    res.status(500).send('Server Error');
  }
});

app.put('/api/members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await updateMember(db, id, updates);
    res.json({ msg: 'Member updated' });
  } catch (err) {
    console.error('Error updating member:', err); // 错误日志
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});