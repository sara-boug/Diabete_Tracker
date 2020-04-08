const express = require('express'); 
const app = express(); 
const port = 3000; 
require("./db/connection");
require("./src/App");

app.listen(port, ()=>{ 
    console.log("Listening to the servre " + port);
})