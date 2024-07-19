import { expect } from 'chai';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import app from '../server/server.mjs';
import { addMember, deleteMember } from '../models/member.mjs';

let mongod;
let db;

before(async function() {
  this.timeout(30000); // 增加超时时间到 30 秒
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  db = mongoose.connection;
  app.use(express.json());
});

beforeEach(async () => {
  // 清空数据库
  await db.collection('members').deleteMany({});
  // 添加初始数据
  await addMember(db, {
    name: 'HAN',
    description: 'student',
    age: 22,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA8GODfBsuHylhyd6SN7ehxW2T3FAh1frqzg&s',
    extraDetail: 'Extra detail about HAN'
  });
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

describe('GET /api/members', () => {
  it('should add and return a member', async () => {
    const member = { name: 'John Doe', description: 'A new member', age: 30, imageUrl: 'http://example.com/image.jpg' };
    await addMember(db, member);

    const res = await request(app).get('/api/members');
    expect(res.statusCode).to.equal(200);
    expect(res.body.length).to.equal(2); // has initial data
    expect(res.body[1].name).to.equal('John Doe');
  });
});

describe('DELETE /api/members/:id', () => {
  it('should add and then delete a member', async () => {
    const member = { name: 'nibaba', description: 'baba', age: 22, imageUrl: 'http://example.com/image.jpg' };
    await addMember(db, member);

    const res = await request(app).get('/api/members');
    expect(res.statusCode).to.equal(200);
    expect(res.body.length).to.equal(2);
    expect(res.body[1].name).to.equal('nibaba');

    // DELETE
    const memberId = res.body[1]._id;
    const deleteRes = await request(app).delete(`/api/members/${memberId}`);
    expect(deleteRes.statusCode).to.equal(204);

    // after delete
    const afterDelete = await request(app).get('/api/members');
    expect(afterDelete.statusCode).to.equal(200);
    expect(afterDelete.body.length).to.equal(1);
    expect(afterDelete.body[0].name).to.equal('HAN');
  });
});