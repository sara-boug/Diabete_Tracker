const app = require("./src/App");
const port = 3000; 
require("./db/connection");

app.listen(port, ()=>{ 
    console.log("Listening to the servre " + port);
})

module.exports=app; 