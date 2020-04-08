const mongoose = require('mongoose');

const Data = new mongoose.Schema({
    GlucosLevel: [{
        date: Date,
        ClucosLevel: [
            {
                level: { type: Number, default: null },
                time: { type: Date }
            }]
    }],
    date:{
        type:Date, 
        default: Date.now
    }
});
const diabeteData = mongoose.model("diabete_Data", Data);

module.exports = diabeteData; 