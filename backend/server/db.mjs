import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();  // 确保在读取环境变量之前调用

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);  // 确认环境变量被正确读取

const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('teamBuilder'); // 确保数据库名称是正确的
    console.log('Connected to MongoDB');
  }
  return db;
};