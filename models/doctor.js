const mongoose = require("mongoose");
const validator = require("validator");
const doctorSchema = mongoose.Schema({
    name: String,
    familyName: String,
    clinic: String,
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please insert A valid Email");
            }
        }
    }, 
    patients:[
        {
            type:mongoose.Schema.Types.ObjectId , ref: "patient"  // reference to the patient model 
        }
    ]

});
const doctor = mongoose.model("doctor" , doctorSchema); 
module.exports = doctor; 