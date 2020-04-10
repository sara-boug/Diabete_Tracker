const express = require("express"); 
const bodyParser= require("body-parser"); 
const app = express(); 

const  patient_route= require("./routes/patient_route"); 
const doctor_route= require("./routes/doctor_route"); 
app.use(bodyParser.json()); 
app.use('/',patient_route); // this would be the patient route 
app.use('/patient', doctor_route); 
module.exports= app ;