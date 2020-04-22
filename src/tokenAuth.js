const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const jwtKey = "jsonWebToken";
const auth = async (req, res, next) => {

    try {
        var reqToken = req.headers.authorization;
        if (reqToken !=undefined) {
            reqToken = reqToken.replace("Bearer", "").trim();
            const token = await jwt.verify(reqToken, jwtKey);
            const patient = await Patient.findOne({ _id: token, 'tokens.token': reqToken });
            if (patient !== null) {
                req.patient = patient;
                req.token = reqToken;
            } else {
                res.status(500).send({ error: "login or Sign Up please" })
            }
            next();
        } else {
            res.status(500).send({ error: "login or Sign Up please" });

        }
    } catch (e) {
        throw new Error(e);
    }
}
module.exports = auth; 