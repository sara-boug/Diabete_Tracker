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
    date: {
        type:Date, 
        default:Date.now
    },
    patient: { 
        type:mongoose.Schema.Types.ObjectId , ref:"patient"
    }
});

const  D_instant_Data= mongoose.model("diabete_Instant_Data", data);
module.exports=D_instant_Data; 