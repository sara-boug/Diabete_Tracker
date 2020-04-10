const express = require("express");
const Doctor = require("../../models/doctor");

const route = express.Router();
const auth = require("../tokenAuth");

route.post("/doctor", auth, async (req, res) => {
     try {
          const find = await Doctor.find({ patient: req.patient._id });
          if (find == null) {
               const newDoc = new Doctor({
                    ...req.body,
                    patient: req.patient._id
               });
               await newDoc.save();
               res.status(200).send();
          } else {

               res.status(500).send({ error: "update your  previous doctor Data !" });
          }
     } catch (e) {
          res.status(500).send(e);
     }
});
route.post("/doctor/update", auth, async (req, res) => {
     try {
          var patient_doc = await Doctor.findOne({ patient: req.patient._id });
          const bodyKeys = Object.keys(req.body);
          bodyKeys.forEach(bkey => {
               patient_doc[bkey] = req.body[bkey];
          });
          await patient_doc.save();
          res.status(200).send({ success: "updated" })
     } catch (e) {
          res.status(500).send();
          throw new Error(e);

     }

});

route.delete("/doctor/delete", auth, async (req, res) => {
     try {
          var patient_doc = await Doctor.findOne({ patient: req.patient._id });
          if (patient_doc == null) {
               res.status(400).send({ error: "deleting fail" });
          } else {
               await Doctor.deleteOne({ patient: req.patient._id });
               res.status(200).send({ seccess: "deleted!" });
          }
     } catch (e) {
          res.status(500).send({ error: "deleting fail" });
          throw new Error(e);


     }
});

module.exports = route;


