const mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost:27017/DiabeteTracker" , (data)=> { 
    console.log("connnected to DataBase"); 
});
