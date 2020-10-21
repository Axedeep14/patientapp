const express = require("express");
const router= express.Router(); 
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const checkauth= require('../checkauth');
const patient=require("../models/model_patient");
const appointment =require("../models/model_appointment")



// register
router.post("/register",(req,res) => {
 
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            console.log(err)
            return res.status(500).json({
                message : 'something went wrong'
            })
        } 
        else{
          const new_patient = new patient({
            _id: req.body._id,
            email: req.body.email,
            password:hash,
            name:req.body.name,
            age:req.body.age,
            contact:req.body.contact
           });
        
        new_patient.save()
        .then((result) => {
            res.json(result)
          })
          .catch(err=>{
            console.log(err)
          })
        }
    })
  });

///login aka token generation

router.post("/login",(req,res) => {
    patient.find({email: req.body.email}).exec()
    .then((user) => {
        if(user.length <1){
          return res.status(401).json({
            message : 'Auth failed'
          });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            
          if(err){
            return res.status(401).json({
              message : 'Auth failed'
            })
          }
  
          if(result)
          {  
            const token= jwt.sign({
               _id :user[0]._id,
               name: user[0].name,
               contact: user[0].contact,
               age: user[0].age
            },"secret",
            {
               expiresIn:"1h" 
            })
            
            return res.status(200).send(token)
          }
  
          return res.status(401).json({
            message : 'Auth failed'
         })
       })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
          })
      })
  });

//get route to get details (dashboard) of patient using token and exacting his id from it
  router.get('/getpatientdetails',checkauth,(req,res) =>{

    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    patient.findById(req.userData._id,function(err,foundPatient){
      if(err)
      {
          
          console.log(err);
      }
      else{
          res.json(foundPatient);
      }
    })
});

/// get patient's prescription to view
router.get("/getmyprescriptions",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
 
  patient.findById(req.userData._id,function(err,foundPatient){
    if(err)
    {
        console.log(err);
    }
    else{
        res.json(foundPatient.history);
    }
  })
})

//edit route to edit information
router.post("/editdetails",checkauth,function(req,res){

    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    patient.findByIdAndUpdate(req.userData._id,req.body,function(err,updated_patient){
        if(err){
            // res.redirect("/patient/get");
            console.log(err);
        }else{
            // res.redirect("/patient/get");
            //res.json(updated_patient);
            res.send("details updated");
        }
    })
});

//delete route to delete account
router.delete("/delete",checkauth,function(req,res){

    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    patient.findByIdAndRemove(req.userData._id,function(err,deleted_patient){
        if(err){
            // res.redirect("/patient");
            console.log("err is "+err)
        }
        else{
            // res.redirect("/patient");
              res.send("deleted");
              console.log(deleted_patient)
             //res.redirect("/");
        }
    })
});

//get route to get all patient
router.get("/getall",function(req,res){
    patient.find({},function(err,patient){
        if(err)
        {
            // res.redirect("/patient/get");
            console.log(err);
        }
        else{
            // console.log(patient);
             res.json(patient);
        }
    })
});

router.post("/requestappointment",checkauth,function(req,res){

  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;

  const new_appointment = new appointment({
    patientid:req.userData._id,
    date: req.body.date,
    time: req.body.time,
    doctorid:req.body.doctorid,
    reason:req.body.reason,
    status : "Not Approved"
  });

 new_appointment.save()
  .then((result) => {
    res.json(result)
  })
  .catch(err=>{
    console.log(err)
  })
});

router.get("/seeappointmentstatus",checkauth,function(req,res){
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
 
  appointment.find({"patientid" :req.userData._id},function(err,foundAppointment){
    if(err)
    {
        console.log(err);
    }
    else{
        res.json(foundAppointment);
    }
  })
})


  module.exports=router;