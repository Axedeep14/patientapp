const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const patientSchema = new Schema({
    _id : {type : String , required : true},
    email : { type : String , required : true},
    password : { type : String , required : true },
    name : { type : String , required : true},
    age : { type : Number , required : true},
    contact : { type : Number , required : true},
});
module.exports=mongoose.model('Patient',patientSchema);