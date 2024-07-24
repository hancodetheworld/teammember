import express from 'express';
import cors from 'cors';
import { connectDB } from './db.mjs';
import { getMembers, addMember, deleteMember, updateMember } from '../models/member.mjs';

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "https://teammember-3.onrender.com", // 替换为你的前端应用的实际域名
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

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
  initializeDatabase(database);

  app.get('/api/members', async (req, res) => {
    try {
      const members = await getMembers(database);
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
      const result = await addMember(database, newMember);
      console.log('Insert result:', result); // 调试信息
      const insertedMember = await database.collection('members').findOne({ _id: result.insertedId });
      res.status(201).json(insertedMember);
    } catch (err) {
      console.error('Error adding member:', err);
      res.status(500).send('Server Error');
    }
  });

  app.delete('/api/members/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await deleteMember(database, id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting member:', err);
      res.status(500).send('Server Error');
    }
  });

  app.put('/api/members/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      await updateMember(database, id, updates);
      res.json({ msg: 'Member updated' });
    } catch (err) {
      console.error('Error updating member:', err);
      res.status(500).send('Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error connecting to database:', err);
  process.exit(1); // 连接数据库失败时退出进程
});

export default app;