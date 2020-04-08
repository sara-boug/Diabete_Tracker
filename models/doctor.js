const mongoose = require("mongoose");
const validator = require("validator");
const doctorSchema = new mongoose.Schema({
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
    }

});
const doctor = mongoose.Schema("doctor" , doctorSchema); 
module.exports = doctor; 