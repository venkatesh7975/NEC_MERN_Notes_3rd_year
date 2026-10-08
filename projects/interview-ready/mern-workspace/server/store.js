import {ObjectId} from 'mongodb';
import {fail} from './validation.js';
export function id(value) {
  if (typeof value !== 'string' || !/^[a-f0-9]{24}$/i.test(value)) fail(404,'NOT_FOUND','Item not found');
  return new ObjectId(value);
}
export function publicItem(item) {
  const {_id,owner,...rest}=item;
  return {id:_id.toHexString(),...rest};
}
export class MongoStore {
  constructor(db) {this.db=db;}
  async initialize() {
    await Promise.all([
      this.db.collection('users').createIndex({email:1},{unique:true}),
      this.db.collection('sessions').createIndex({tokenHash:1},{unique:true}),
      this.db.collection('sessions').createIndex({expiresAt:1},{expireAfterSeconds:0}),
      this.db.collection('tasks').createIndex({owner:1,createdAt:-1,_id:-1}),
      this.db.collection('bookmarks').createIndex({owner:1,url:1},{unique:true}),
      this.db.collection('bookmarks').createIndex({owner:1,createdAt:-1,_id:-1}),
      this.db.collection('expenses').createIndex({owner:1,createdAt:-1,_id:-1})
    ]);
  }
  async createUser(email,passwordHash) {
    const result=await this.db.collection('users').insertOne({email,passwordHash});
    return {id:result.insertedId.toHexString(),email};
  }
  async userByEmail(email) {return this.db.collection('users').findOne({email});}
  async createSession(tokenHash,user) {
    await this.db.collection('sessions').insertOne({tokenHash,user,expiresAt:new Date(Date.now()+86400_000)});
  }
  async session(tokenHash) {return this.db.collection('sessions').findOne({tokenHash,expiresAt:{$gt:new Date()}});}
  async revoke(tokenHash) {await this.db.collection('sessions').deleteOne({tokenHash});}
  async list(kind,owner) {
    return (await this.db.collection(kind).find({owner}).sort({createdAt:-1,_id:-1}).limit(50).toArray()).map(publicItem);
  }
  async create(kind,owner,fields) {
    const item={owner,...fields,createdAt:new Date()};
    if (kind==='tasks') Object.assign(item,{status:'todo',version:0});
    const result=await this.db.collection(kind).insertOne(item);
    return publicItem({...item,_id:result.insertedId});
  }
  async updateTask(owner,itemId,fields) {
    const _id=id(itemId);
    const item=await this.db.collection('tasks').findOneAndUpdate(
      {_id,owner,version:fields.version},
      {$set:{title:fields.title,status:fields.status},$inc:{version:1}},
      {returnDocument:'after'}
    );
    if (item) return publicItem(item);
    const exists=await this.db.collection('tasks').findOne({_id,owner},{projection:{_id:1}});
    if (exists) fail(409,'CONFLICT','Task changed in another tab. Reload and try again.');
    fail(404,'NOT_FOUND','Item not found');
  }
  async remove(kind,owner,itemId) {
    const result=await this.db.collection(kind).deleteOne({_id:id(itemId),owner});
    if (!result.deletedCount) fail(404,'NOT_FOUND','Item not found');
  }
  async expenseSummary(owner) {
    const rows=await this.db.collection('expenses').aggregate([
      {$match:{owner}},{$group:{_id:null,totalCents:{$sum:'$cents'},count:{$sum:1}}}
    ]).toArray();
    return {totalCents:rows[0]?.totalCents??0,count:rows[0]?.count??0,currency:'INR'};
  }
}
