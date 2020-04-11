const mongoose = require('mongoose');

const Data = new mongoose.Schema({
    GlucosLevel: {
        date:{
            type:Date, 
            default:Date.now
        },    
        glucosLevel: [
            {
                level: { type: Number, default: null },
                time: { type: Date }
            }]
    },
    patient: { 
        type: mongoose.Schema.Types.ObjectId, ref: "patient"
    }
});
const diabeteData = mongoose.model("diabete_Data", Data);

module.exports = diabeteData; 