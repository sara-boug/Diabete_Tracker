const chai = require('chai');
const chai_http = require('chai-http');
const app = require('../index');
const Patient = require("../models/patient");
const bcrypt = require("bcrypt");
var { doctor, patient ,token} = require("./fixtures/testDate");
var mongoose = require("mongoose");
var  Doctor=require('../models/doctor');
 
 var update = "Zouhra"; // this is used to test the update route
chai.use(chai_http);
before(async function () {
    await Patient.deleteMany({ });
})
it("signUp the user", (done) => {
    chai.request(app)
        .post("/patient/signUp")
        .send(patient).end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var data = await Patient.findById(res.body._id);
              chai.expect(data).not.equal(null);  
            var psw = await bcrypt.compare(patient.password, data.password);
            chai.expect(psw).to.equal(true)
            var resultData = {
                name: data.name,
                familyName: data.familyName,
                email: data.email,
            }
            var expectedData =
            {
                name: patient.name,
                familyName: patient.familyName,
                email: patient.email,
            }
            chai.expect(JSON.stringify(resultData).toLowerCase()).to.equal(JSON.stringify(expectedData).toLowerCase());
            done();
        })

});

it("login user", (done) => {
    chai.request(app)
        .post("/patient/login")
        .send({
            email: patient.email,
            password: patient.password
        }).end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
        })

})

it("update User Profile", (done) => {
    chai.request(app)
        .post("/patient/update")
        .set('Authorization', token)
        .send({
            name: update
        })
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var patient = await Patient.findById(res.body._id);

            var result = patient.name.toLowerCase() == update.toLowerCase();
            chai.expect(result).to.equal(true);
            done();
        })

})
it("update User Profile without header token", (done) => {
    chai.request(app)
        .post("/patient/update")
        .end(async (err, res) => {
            chai.expect(res).to.have.status(500);
            done();
        })
});

it("get all patient", (done) => {
    chai.request(app)
        .get("/patient/all")
        .set('Authorization', token)
        .end(async (err, res) => {
            chai.expect(res).to.have.status(200);
            var result = res.body.forEach(element => {
                var id1 = mongoose.Types.ObjectId(element._id);
                var id2 = mongoose.Types.ObjectId(res.body._id);
                return id1.equals(id2);
            });
            chai.expect(result).to.equal(undefined);
            done();
        })
});
  
 /*
it("logout user", (done) => {
    chai.request(app)
        .get("/patient/logout")
        .set('Authorization', token)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            var result = res.body.tokens.forEach(element => {

                return element == token;
            });
            chai.expect(result).to.equal(undefined);
            done();
        })

});

 */