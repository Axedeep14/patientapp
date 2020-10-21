const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const appointmentSchema = new Schema({
    patientid : { type : String , required : true},
    date : { type : String , required : true},
    time : { type : String , required : true},
    doctorid : { type : String , required : true},
    reason: {type : String , required : true},
    status : {type : String , required : true }
});
module.exports=mongoose.model('Appointment',appointmentSchema);