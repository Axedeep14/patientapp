const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const prescriptionSchema = new Schema({
    date : { type : String , required : true},
    time : { type : String , required : true},
    medicine : { type : String , required : true},
    disease : { type : String , required : true}
});
module.exports=mongoose.model('Prescription',prescriptionSchema);