const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = "mongodb+srv://deepak:123@cluster0.7f3dc.mongodb.net/Dapp?retryWrites=true&w=majority"
const patient = require('./models/model_patient');
const prescription = require('./models/model_prescription');
const route_patient = require('./routes/route_patient');
const route_doctor = require('./routes/route_doctor');

app.use(bodyParser.urlencoded({     extended: false  })); 
app.use(bodyParser.json());

app.use('/patient',route_patient);
app.use('/doctor',route_doctor);

app.post('/addpatient',(req,res) => {
    patient.create(req.body,function(err,newlyCreatedpatient){
        if (err){
            // res.redirect("/customer/get");
            console.log(err);
        }
        else{
            // res.redirect("/customer/get");
            res.send(newlyCreatedpatient);
            console.log(newlyCreatedpatient);
        } 
    })
});

app.post('/generatePrescripton',(req,res) => {
    prescription.create(req.body,function(err,newlyCreatedprescription){
        if (err){
            // res.redirect("/customer/get");
            console.log(err);
        }
        else{
            // res.redirect("/customer/get");
            res.send(newlyCreatedprescription);
            console.log(newlyCreatedprescription);
        } 
    })
});

app.get('/getbyprescriptionid/:id',(req,res) =>{
    prescription.findById(req.params.id)
   .then((result)=>{ res.json(result) ;
    console.log(result);
   }).catch(err => console.log(err));
});



app.post('/addPrescription/:id',(req,res) =>{
    prescription.findById(req.params.id)
     .then((founded_prescription)=>{
        patient.findOneAndUpdate(
            { _id: "5f5603782741505408912008" }, 
            { $push: { history: founded_prescription._id } },
            function (error,addedprecription) {
                if (error) {
                    console.log(error);
                } else {
                    res.send ("success");
                }
            })
        }).catch(err=>{
            console.log(err)
        })
})

app.get('/add',(req,res) => {
    res.render("form");
});

mongoose.Promise=global.Promise;

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }
    else
    console.log("connected to db")
})

app.listen(process.env.PORT||4000,function(){
    console.log("server running on port 4000");
});