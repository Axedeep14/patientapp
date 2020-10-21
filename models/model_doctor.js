const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const doctorSchema = new Schema({
    email : { type : String , required : true},
    password : { type : String , required : true },
    name : { type : String , required : true},
    contact : { type : Number , required : true},
    address : { type : String , required : true }
});

module.exports=mongoose.model('Doctor',doctorSchema);