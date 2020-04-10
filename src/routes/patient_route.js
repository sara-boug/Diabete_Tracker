const express = require("express");
const Patient = require("../../models/patient");
const jwt = require("jsonwebtoken");
const route = express.Router();
const jwtKey = "jsonWebToken";
const auth = require("../tokenAuth"); 


route.post("/patient/signUp", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        const token = await patient.generateToken();
        req.user = patient;
        res.send(patient);
    } catch (e) {
        throw new Error(e);
    }
});

route.get("/patient/login", async (req, res) => {
    try {
        const patient = await Patient.findPatient(req.body.email, req.body.password);
        console.log(patient);
        res.send(patient);

    } catch (e) {
        res.send(e)
    }
});

route.get("/patient/logout", auth, async (req, res) => {
    try {
        const array = req.patient.tokens.filter(element => {
            return element.token == req.patient.token
        });
        req.patient.tokens = array;
        await req.patient.save();
        res.send({ notification: "Disconnected" });
    } catch (e) {
        res.status(500).send(); 
    }
});

route.post("/patient/update", auth, async (req, res) => {
    try {
        const bodyKeys = Object.keys(req.body);
        const reqKeys = Object.keys(req.patient);
        bodyKeys.forEach(bkey => {
            req.patient[bkey] = req.body[bkey];
        });
        await req.patient.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();

    }
});
route.get("/patient/all", auth , async(req, res)=> { 
     try {  
         const array = await Patient.find({}); 
          const filteredArray= array.filter(element => { 
              return   element.email!=req.email ; 
          })
      
        res.status(400).send(filteredArray);         
     }catch(e) { 
         throw new Error(e)
       
     }
})
module.exports = route; 