const mongo = require("mongoose");
const {Schema} = mongo;

const registerSchema = new Schema({
    profile : String,
    fullname : String,
    email :{
        type : String,
        unique : true
    },
    mobile: String,
    dob : String,
    gender : String,
    address : String,
    createdAt : {
        type: Date,
        default : Date.now
    }

});

module.exports = mongo.model('registerr', registerSchema);