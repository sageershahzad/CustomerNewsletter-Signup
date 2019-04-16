//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
//use your own correct api 
    var options = {
        url: "add-your-own-api-url",
        method: "POST",
        headers: {
            "Authorization": "use-your-own-api-key"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
            if(error){
                //console.log(error);
                //res.send("There was an eror with signing up, Please try again!");
                res.sendFile(__dirname + "/failure.html");
            }
            else{
                //console.log(response.statusCode);
                if(response.statusCode == 200){
                    //res.send("Successfully Subscribed!");
                    res.sendFile(__dirname + "/success.html");
                }
                else{
                    //res.send("There was an eror with signing up, Please try again!")
                    res.sendFile(__dirname + "/failure.html");
                }
            }
    });

    //console.log(firstName, lastName, email);
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server for NEWSLETTER signup is running at port 3000.");
});

