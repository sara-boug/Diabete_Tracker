const express = require("express"); 
const bodyParser= require("body-parser"); 
const app = express(); 

const  patient_route= require("./routes/patient_route"); 
const doctor_route= require("./routes/doctor_route"); 
const data_diabete_route= require('./routes/data_diabete_route');
app.use(bodyParser.json()); 
app.use('/',patient_route); // this would be the patient route 
app.use('/patient', doctor_route); 
app.use('/patient', data_diabete_route); 


module.exports= app ;