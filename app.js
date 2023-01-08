const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/ce622ba666"
    const options={
        method:"POST",
        auth:"sq:8b3fb065657eca50164a89c37afa4bb4-us21"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200)
        res.sendFile(__dirname+"/success.html")
        else
        res.sendFile(__dirname+"/failure.html")
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
   request.write(jsonData);
    request.end(); 
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function () {
    console.log("server is running");
});
