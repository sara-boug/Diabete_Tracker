const DataD = require('../../models/diabeteData');
const route = require("express").Router();
const auth = require('../tokenAuth');


route.get('/ddata', auth, async(req, res)=> { 
    try{ 
       const data = await DataD.findOne({ patient: req.patient.id });
       if(data!=null) { 
          res.status(200).send(data.GlucosLevel.glucosLevel);
       }else { 
           res.status(200).send({state:"not Found"})
       }
       
    }catch(e){ 
      throw new Error(e); 

    }

})
route.post('/ddata/add', auth, async (req, res) => {
    try {
        const data = await DataD.findOne({ patient: req.patient.id });
        if (data == null) {
            var insertD = new DataD({
               "GlucosLevel.glucosLevel": req.body,
                patient: req.patient._id
            });
            await insertD.save();
            res.status(200).send();
        } else {
            var array = [...data.GlucosLevel.glucosLevel, ...req.body];
            console.log(data);
            data.GlucosLevel.glucosLevel= array;
            await data.save();
            res.status(200).send();
        }
    } catch (e) { 
        res.status(500).send(); 
        throw new Error(e)
    }
});
route.delete('/ddata/delete', auth, async(req, res) => { 
      try{ 
        const data= await DataD.findOneAndDelete({patient:req.patient.id});
        res.status(200).send();    
      }catch(e) { 
        res.status(500).send();    
        throw new Error(e); 
      }
}); 
module.exports = route; 