const chai = require('chai');
const chai_http = require('chai-http');
const app = require('../index');
const Patient = require("../models/patient");
const bcrypt = require("bcrypt");
var { patient, token, Ddata } = require("./fixtures/testDate");
var mongoose = require("mongoose");
var dataD = require('../models/diabeteData');
chai.use(chai_http);
before(async function () {
    await dataD.deleteMany({});
})

it("add patient data or modify it ", (done) => {
    chai.request(app)
        .post("/patient/ddata/add")
        .set("Authorization", token)
        .send(Ddata)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await dataD.find({ patient: patient._id });
            chai.expect(data.length).to.equal(1);
            chai.expect(data[0].GlucosLevel.glucosLevel.length).to.equal(1);
            done();
        })
});
it("add patient data ", (done) => {
    chai.request(app)
        .get("/patient/ddata")
        .set("Authorization", token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await dataD.find({ patient: patient._id });
            var result = data[0].GlucosLevel.glucosLevel[0].level == Ddata[0].level;
            chai.expect(result).to.equal(true);
            done();
        })
});

it("delete patient data  ", (done) => {
    chai.request(app)
        .delete("/patient/ddata/delete")
        .set("Authorization", token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await dataD.findOne({ patient: patient._id });
            chai.expect(data).to.equal(null); 
            done(); 
        });
   });
 

