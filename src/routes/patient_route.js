const express = require("express");
const Patient = require("../../models/patient");
const jwt = require("jsonwebtoken");
const route = express.Router();
const jwtKey = "jsonWebToken";

const auth = async (req, res, next) => {

    try {
        var reqToken = req.headers.authorization;
        reqToken = reqToken.replace("Bearer", "").trim();
        const token = await jwt.verify(reqToken, jwtKey);
        const patient = await Patient.findOne({ _id: token, 'tokens.token': reqToken });
        if (patient !== null) {
            req.patient = patient;
            req.token = reqToken;
        } else {
            res.send({error:"login or Sign Up please"})
        }
        next();
    } catch (e) {
        throw new Error(e);
    }
}




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
        res.send({notification:"Disconnected"});
    } catch (e) {
        res.status(500)
    }
});

module.exports = route; 