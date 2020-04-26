var mongoose = require('mongoose');
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThmNjA0ZWI5ZmYzMjI1Njg3MjUyMGMiLCJpYXQiOjE1ODc3NTE3ODR9.0cVBYNNoF2E4b68J_hlJTt9dhhV3KKhgjFVydC9Xf54";
var patient = {
    _id: mongoose.Types.ObjectId("5e8f604eb9ff32256872520c"),
    name: "yasmine",
    familyName: "Bouglam",
    email: "yayasyasboug@gmail.com",
    password: "bougbgou123",
    tokens: [
        { token: token }
    ]
}

var patient1 = {
    _id: mongoose.Types.ObjectId("5e90b67ffe67323538d876e8"),
    name: "yasmine",
    familyName: "Bouglam",
    email: "yayaboug@gmail.com",
    password: "bougbgou123", 
    tokens: [
       { token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZThmNjA0ZWI5ZmYzMjI1Njg3MjUyMGMiLCJpYXQiOjE1ODc3NzE5OTV9.YRhmNm-tVBN-j5mMR0-bgULa4VWfE4g7xrDIPRz2-s4"}
    ]
}

var doctor = {
    _id: mongoose.Types.ObjectId("5ea35e52aedb850994af518c"),
    name: "Maatouke",
    familyName: "jack",
    email: "matouk@gmail.com",
    patient: mongoose.Types.ObjectId("5e8f604eb9ff32256872520c") // concerns the patient
}
var doctor1 = {
    _id: new mongoose.Types.ObjectId(),
    name: "Maatoukee",
    familyName: "Maxime",
    email: "matouke@gmail.com",
    patient: mongoose.Types.ObjectId("5e90b67ffe67323538d876e8") // concerns the patient1
}

var Ddata =  
    [
    {
        "level":1.5, 
        "time":12.10
    }
    ]

module.exports = {
    patient,
    patient1,
    token,
    doctor,
    doctor1, 
    Ddata}