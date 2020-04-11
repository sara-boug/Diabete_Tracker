const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = "jsonWebToken";

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
        lowercase: true

    },
    country: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not an Email")
            }
        }

    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes(this.name) || value.includes(this.familyName)) {
                throw new Error("Name , family Name can not be included");
            }
        }
    },
 
    tokens:
        [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]

});
//hashing the password
patientSchema.pre('save', async function (next) {
    if (this.isModified("password") || this.isNew) {
        try {
            const saltRound = 10;
            const psw = await bcrypt.hash(this.password, saltRound);
            this.password = psw;
            next();
        } catch (e) {
            throw new Error(e);
        }
    }
});
// generating token 

patientSchema.methods.generateToken = async function () {
    try {
        var token = { token: await jwt.sign({ _id: this._id }, jwtKey) };
        var array = [...this.tokens, token];
        console.log(array)
        this.tokens = array;
        await this.save();
        return token;
    } catch (e) {
        throw new Error(e);
    }
}

patientSchema.statics.findPatient = async function (email, password) {
    try {
        const patient = await this.findOne({
            email: email,
        });
        if (patient != null) {
            const compare = await bcrypt.compare(password, patient.password);
            console.log(compare);
            if (compare == true) {
                return patient.generateToken(); 
            } else {
                return { error: "password incorrect" }
            }
        } else {
            return { error: "sign up please" }
        }
    } catch (e) {
        throw new Error(e)
    }
}

const patient = mongoose.model("patient", patientSchema);
module.exports = patient;