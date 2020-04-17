var instant_d_data = require("../../models/D_instantData");
var auth = require('../tokenAuth');
var route = require('express').Router();
var mongoose = require('mongoose'); 

route.post("/instdd/add", auth, async (req, res) => {
    try {
        console.log(req.body);
        var data = new instant_d_data({
            "GlucosLevel.glucosLevel": req.body,
            patient:req.patient._id
        });
        await data.save(); 
        res.status(200).send(data); 
    } catch (e) {
        res.status(500).send(); 
        throw new Error(e);
    }
});

route.get("/instdd", auth, async(req, res)=> { 
      try{ 
           var data= await instant_d_data.find({patient:req.patient.id});
            console.log(data)
            res.status(200).send(data); 
      }catch(e) {
          res.status(500).send(); 
          throw new Error(e);
      }

}) ;

route.delete("/instdd/delete/:id", auth , async(req, res) => { 
    try { 
       var id = new mongoose.Types.ObjectId(req.params.id);
        var data= await instant_d_data.findOneAndDelete({ 
           _id:id, 
           patient:req.patient._id
       }); 
         res.status(200).send(); 
    }catch(err) { 
        res.status(500).send(); 
         throw new Error(err)
    }
})
route.patch("/instdd/update/:id", auth , async(req, res) => { 
    try { 
       var id = new mongoose.Types.ObjectId(req.params.id);
        var data= await instant_d_data.findOne({ 
           _id:id, 
           patient:req.patient._id
       }); 
         
         data.GlucosLevel.glucosLevel= req.body; 
         await data.save(); 
         res.status(200).send(data.GlucosLevel.glucosLevel); 
    }catch(err) { 
        res.status(500).send(); 
         throw new Error(err)
    }
})

route.get("/instdd/:id", auth , async(req, res) => { 
    try { 
        var id = new mongoose.Types.ObjectId(req.params.id);
        var data= await instant_d_data.findOne({ 
           _id:id, 
           patient:req.patient._id
       }); 
         res.status(200).send(data); 
    }catch(err){ 
        res.status(500).send(); 
         throw new Error(err)
    }
})

module.exports = route; 