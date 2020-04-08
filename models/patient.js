const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    familyName: {
        type: String,
        required: true,

    },
    country:String, 
    email: {
        type: String,
        required: true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not an Email")
            }
        }

    },
    password: {
        type: String,
        minlength: 7,
        validate(value) {
            if (value.includes(this.name) || value.includes(this.familyName)) {
                throw new Error("Name , family Name can not be included");
            }
        }
    }, 
    data:{ 
        type:mongoose.Schema.Types.ObjectId  , ref:"diabete_Data"

    }

});


const patient = mongoose.model("patient", patientSchema);
module.exports =patient;