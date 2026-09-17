// mongosh core-crud.js — disposable teaching database only.
const practice = db.getSiblingDB('nec_practice');
practice.courses.createIndex({ code: 1 }, { unique: true });
practice.courses.updateOne({code:'HTML'}, {$set:{hours:10,category:'frontend'}}, {upsert:true});
practice.courses.updateOne({code:'CSS'}, {$set:{hours:14,category:'frontend'}}, {upsert:true});
practice.courses.updateOne({code:'HTML'}, {$set:{hours:11}});
printjson(practice.courses.find({code:{$in:['HTML','CSS']}},{_id:0,code:1,hours:1}).sort({code:1}).toArray());
// Expected CSS 14, HTML 11. Re-running resets only these two teaching fixtures.
