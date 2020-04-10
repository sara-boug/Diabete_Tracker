const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

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
            res.send({ error: "login or Sign Up please" })
        }
        next();
    } catch (e) {
        throw new Error(e);
    }
}
module.exports= auth; 