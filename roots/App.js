
 var patient =require("../models/patient"); 

 var  p = new   patient({  
    name:"sara" ,
    familyName:"saro", 
    email:"sarabouglam@gmail.com", 
    password:"jajouujajuo159"
}) ;
p.save().then((data) => { 
   console.log(data)
})
