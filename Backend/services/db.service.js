const mongo = require("mongoose");

const url = "mongodb://127.0.0.1:27017/crud";
mongo.connect(url);

const readRecord = async (schema) =>{
    const dbRes = await schema.find().sort({_id:-1});// it will show the new id in first istead of last
    return dbRes;
}

const createRecord = async (data, schema) =>{
    const dbRes = await new schema(data).save();
    return dbRes;
}

const updateRecord = async (id,data,schema)=>{
    const dbRes = await schema.findByIdAndUpdate(id,data,{new:true});
    return dbRes;
}
const removeRecord = async (id,schema)=>{
    const dbRes = await schema.findByIdAndDelete(id);
    return dbRes;
}

module.exports = {
    readRecord,
    createRecord,
    updateRecord,
    removeRecord
}