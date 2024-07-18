// backend/tests/server.test.mjs
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../server/server.mjs'; // 确保路径正确
import { getMembers, addMember } from '../models/member.mjs';

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

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

describe('GET /api/members', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/api/members');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.deep.equal([]);
  });

  it('should add and return a member', async () => {
    const member = { name: 'John Doe', description: 'A new member', age: 30, imageUrl: 'http://example.com/image.jpg' };
    await addMember(db, member);

    const res = await request(app).get('/api/members');
    expect(res.statusCode).to.equal(200);
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('John Doe');
  });
});