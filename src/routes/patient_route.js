const express = require("express");
const Patient = require("../../models/patient");
const DataD = require('../../models/diabeteData');
const instant_d_data = require("../../models/D_instantData");
const Doctor = require("../../models/doctor");
const mongoose = require("mongoose");


const jwt = require("jsonwebtoken");
const route = express.Router();
const jwtKey = "jsonWebToken";
const auth = require("../tokenAuth");


route.post("/patient/signUp", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        const token = await patient.generateToken();
        req.user = patient;
 
        res.status(200).send(patient);
    } catch (e) {
        res.status(500).send()
        throw new Error(e);
    }
});

route.post("/patient/login", async (req, res) => {
    try {
        const patient = await Patient.findPatient(req.body.email, req.body.password);
        res.status(200).send(patient);

    } catch (e) {
        res.status(500).send()
    }
});

route.get("/patient/logout", auth, async (req, res) => {
    try {
        const array = req.patient.tokens.filter(element => {
            return element.token == req.patient.token
        });
        req.patient.tokens = array;
        await req.patient.save();
        res.send(req.patient);
    } catch (e) {
        res.status(500).send();
    }
});

route.post("/patient/update", auth, async (req, res) => {
    try {
        const bodyKeys = Object.keys(req.body);
         bodyKeys.forEach(bkey => {
            req.patient[bkey] = req.body[bkey];
        });
        var patient=await req.patient.save();
        res.status(200).send(patient);
    } catch (e) {
        res.status(500).send();

    }
});
route.get("/patient/all", auth, async (req, res) => {
    try {
        const array = await Patient.find({});
        const filteredArray = array.filter(element => {
             var id1 = mongoose.Types.ObjectId(element._id);
             var id2 = mongoose.Types.ObjectId(req.patient._id);
             return  !id1.equals(id2);
        })
         res.status(200).send(filteredArray);
    } catch (e) {
        res.status(500).send();
        throw new Error(e)

    }
});
 
route.delete("/patient/delete", auth,  async (req, res) => {
    try {
         var patient= await Patient.findOneAndDelete({_id:req.patient._id});
         await DataD.findOneAndDelete({patient:req.patient._id});
         await instant_d_data.deleteMany({patient:req.patient._id}); 
         await Doctor.findOneAndDelete({patient:req.patient._id});
         res.status(200).send(patient);
        
    } catch(e) {
        res.status(500).send()
        throw new Error(e); 

    }
})
module.exports = route; 