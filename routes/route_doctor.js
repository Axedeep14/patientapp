const express = require("express");
const router= express.Router(); 
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const checkauth= require('../checkauth');
const doctor=require("../models/model_doctor");
const patient = require("../models/model_patient");



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
          const new_doctor = new doctor({
            email: req.body.email,
            password:hash,
            name:req.body.name,
            contact:req.body.contact,
            address:req.body.address
           });
        
        new_doctor.save()
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
    doctor.find({email: req.body.email}).exec()
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
               id :user[0]._id,
               name: user[0].name,
               contact: user[0].contact,
               address: user[0].address
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

  router.post("/findpatientaddprescription",checkauth,(req,res) => {
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"secret");
    req.userData =decoded;

    const patient_id = req.body.patient_id;
    const new_prescription = {
        date : req.body.date,
        time : req.body.time,
        medicine : req.body.medicine,
        disease : req.body.disease,
        doctor_id : req.userData.id
    };

    patient.findByIdAndUpdate(patient_id,{ $push: { history : new_prescription } },function(err){
        if(err){
            console.log(err);
        }else{

            res.send("prescription added to history");
        }
    })

  })

  module.exports=router;