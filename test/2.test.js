var { doctor1, doctor, patient, patient1, token } = require('./fixtures/testDate');
var Doctor = require('../models/doctor');
var Patient = require('../models/patient');
var app = require('../index');
const chai = require('chai');
const mongoose = require("mongoose");
const chai_http = require('chai-http');
const fNameUpdate = "Max";
var p1, d1;
chai.use(chai_http);
before(async function () {
    await Doctor.deleteMany({});
    p1 = new Patient(patient1);
    p1 = await p1.save();
    d1 = new Doctor(doctor1)
    d1 = await d1.save();

});

it("insert Doctor info", (done) => {
    chai.request(app)
        .post("/patient/doctor")
        .send(doctor)
        .set('Authorization', token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await Doctor.find({ patient: patient._id });
            chai.expect(data.length).to.equal(1);
            var resulted = {
                name: data[0].name.toLowerCase().trim(),
                familyName: data[0].familyName.toLowerCase().trim(),
                email: data[0].email,
            }
            var expected = {
                name: doctor.name.toLowerCase().trim(),
                familyName: doctor.familyName.toLowerCase().trim(),
                email: doctor.email,
            }
            var result = expected.name == resulted.name && expected.familyName == resulted.familyName && expected.email == resulted.email;
            chai.expect(result).to.equal(true);
            done();
        })
});


it("update Doctor info", (done) => {
    chai.request(app)
        .post("/patient/doctor/update")
        .send({ familyName: fNameUpdate })
        .set('Authorization', token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await Doctor.findOne({ patient: patient._id, familyName: fNameUpdate });
            chai.expect(data).not.to.equal(null);
            var id1 = mongoose.Types.ObjectId(data._id);
            var id2 = mongoose.Types.ObjectId(res.body._id);
            var result = id1.equals(id2);
            chai.expect(result).to.equal(true);
            done();
        })
});

it("get patient doctor info", (done) => {
    chai.request(app)
        .get("/patient/doctor")
        .set('Authorization', token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        });

});
it("get patient doctor by another token", (done) => {
    chai.request(app)
        .get("/patient/doctor")
        .set('Authorization', token)
        .end(async (err, res) => {
            try {
                var data = await Doctor.findOne({ _id: doctor1._id, patient: res.body._id });
                chai.expect(data).to.equal(null)
                done();
            } catch (e) {
                throw new Error(e)
            }
        });

});
it("delete doctor content", (done) => {
    chai.request(app)
        .delete("/patient/doctor/delete")
        .set('Authorization', token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await Doctor.findOne({ patient: patient._id });
            chai.expect(data).to.equal(null)
            done();
       
        })

    })