const mongoose = require("mongoose");

const  data= new mongoose.Schema({
    GlucosLevel: [{
        date: Date,
        ClucosLevel: [
            {
                level: { type: Number, default: null },
                time: { type: Date }
            }]
    }],
    date: new Date.now
});

const  D_instant_Data= mongoose.Schema("diabete_Instant_Data", data);
module.exports=D_instant_Data; 