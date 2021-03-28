const express = require('express');
const path = require('path');
const cors=require('cors');
const bcrypt=require('bcryptjs');

var mongodb=require("mongodb");
var MongoClient=mongodb.MongoClient;
var url=process.env.url;
const app = express();
const PORT = process.env.PORT || 5000; 
var dbname="facebookclonedata";
const nodemailer=require("nodemailer");
const jwt = require("jsonwebtoken");
const client_URL="https://manasa-facebook-clone.netlify.app/";
const client_URL1="https://manasa-facebook-clone.netlify.app/changepassword"

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const gmail_user=process.env.gmail_user;
const clientID=process.env.clientID;
const clientSecret=process.env.clientSecret;
const refreshToken=process.env.refreshToken;
const oauth2Client = new OAuth2(
    clientID,
    clientSecret,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );
  
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });
  const accessToken = oauth2Client.getAccessToken()
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: gmail_user,
      clientId: clientID,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken
    }
  });


  


app.post("/login1",(req,res)=>{

    MongoClient.connect(url,function(err,client)
    {
        if(err)
            console.log("Error occured while connecting to mongoDB Atlas....\n",err);
        var db=client.db(dbname);
        
        var cursor=db.collection("user").findOne({mobemail:req.body.email});
        cursor.then(async function(user)
        {
            if(user)
            {
                try
                {
                    console.log(req.body.password)
                    let result = await bcrypt.compare(req.body.password, user.password);
                    if(result)
                    {
                        client.close();
                        res.json({
                            message:"Success",
                            
                        })
                    }
                    else
                    {
                        client.close();
                        res.json({
                            message:"Username or Password is incorrect"
                        })
                    }
                }
                catch(error)
                {
                    console.log(error);
                }

            }
            else
            {
                client.close();
                res.json({
                    message:"User not found"
                })
            }

        })
        
    })


})


app.post("/login",(req,res)=>{

    MongoClient.connect(url,function(err,client)
    {
        if(err)
            console.log("Error occured while connecting to mongoDB Atlas....\n",err);
        var db=client.db(dbname);
        
        var cursor=db.collection("user").findOne({mobemail:req.body.mobemail});
        cursor.then(async function(user)
        {
            if(user)
            {
                try
                {
                    console.log(req.body.password)
                    let result = await bcrypt.compare(req.body.password, user.password);
                    if(result)
                    {
                        client.close();
                        res.json({
                            message:"Success",
                            
                        })
                    }
                    else
                    {
                        client.close();
                        res.json({
                            message:"Username or Password is incorrect"
                        })
                    }
                }
                catch(error)
                {
                    console.log(error);
                }

            }
            else
            {
                client.close();
                res.json({
                    message:"User not found"
                })
            }

        })
        
    })


})
app.get("/",(req,res)=>{
    MongoClient.connect(url,function(err,client)
    {
        if(err)
            console.log("Error occureed while connecting to MongoDB Atlas...\n",err);
        var db=client.db(dbname);
        client.close();
        res.json({message:"Connected"});
    })
})
app.post("/forgotPassword",(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        var db = client.db(dbname);
        var cursor=db.collection("user").find({mobemail:req.body.mobemail}).toArray();
        console.log(req.body.email);
        cursor.then(async function(user)
        {
            
            if(user)
            {
                try{
                let token = jwt.sign({ email: req.body.mobemail },process.env.EMAIL_SECRET);
                let mail_to_send=req.body.mobemail;
                console.log(mail_to_send);
                console.log(req.body.email);
                let url = `https://manasa-facebook-clone.herokuapp.com/confirmation1/${token}`;
                let info = await transporter.sendMail({
                    from: gmail_user,
                    to:mail_to_send,
                    subject: "Facebook Clone Application---Forgot Password",
                    text: "Click the below link to reset the password",
                    html: `<a href=${url}>Please Click on the URL to Register</a>`
                });
                client.close();
                res.json({message:"Email Sent to your email account. Please Verify"})
                }
                catch(error)
                {
                    if(client)
                        client.close();
                    res.json({
                        message:error
                    })    
                }
            }
            else
            {
                client.close();
                res.json({message:"User not found"})
            }
        })
})
})
app.put("/changepassword",(req,res)=>{
    MongoClient.connect(url,async function(err,client)
    {
        if(err)
        {
            console.log('Error occurred while coonecting to MongoDB Atlas ....\n',err)
        }
        var db=client.db(dbname);
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.newpassword, salt);
        req.body.newpassword=hash;
        db.collection("user").findOneAndUpdate({mobemail:req.body.mobemail},{$set:{"password":req.body.newpassword}},
        function(err,data)
        {
            if(err)
                console.log(err);
            client.close();
            res.json({message:"Password changed successfully"})
        });
        // res.json({message:"data updated"})
    });
   
    

})

app.get("/confirmation1/:token",(req,res)=>{

    MongoClient.connect(url,function(err,client){
        if(err)
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        var db=client.db(dbname);
        let url_speci = `https://manasa-facebook-clone.herokuapp.com/confirmation1/${req.params.token}`;
        console.log(url_speci);
        let email_ver = jwt.verify(req.params.token, process.env.EMAIL_SECRET,async function (err,decoded)
        {
            if(decoded)
            {
                console.log(decoded);
                try{
                    var cursor=await db.collection("user").findOneAndUpdate({mobemail:decoded.email},{$set:{email_verify:true}});
                    client.close();
                    res.redirect(client_URL1)
                }
                catch(error){
                    client.close();
                    res.json({
                        message:"URL is not valid"
                    })
                }
            
           }
           else
           {
            res.json({
                message: "Token is not valid"
                })
           }
        })
        
    });
});

app.get("/confirmation/:token",(req,res)=>{

    MongoClient.connect(url,function(err,client){
        if(err)
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        var db=client.db(dbname);
        let url_speci = `https://manasa-facebook-clone.herokuapp.com/confirmation/${req.params.token}`;
        console.log(url_speci);
        let email_ver = jwt.verify(req.params.token, process.env.EMAIL_SECRET,async function (err,decoded)
        {
            if(decoded)
            {
                console.log(decoded);
                try{
                    var cursor=await db.collection("user").findOneAndUpdate({mobemail:decoded.email},{$set:{email_verify:true}});
                    client.close();
                    res.redirect(client_URL)
                }
                catch(error){
                    client.close();
                    res.json({
                        message:"URL is not valid"
                    })
                }
            
           }
           else
           {
            res.json({
                message: "Token is not valid"
                })
           }
        })
        
    });
});
app.post("/",(req,res)=>{
    MongoClient.connect(url, function(err, client) {
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        var db = client.db(dbname);
        
        var cursor=db.collection("user").find({mobemail:req.body.mobemail}).toArray();
        cursor.then(async function(data)
        {
           // console.log(data.length);
           if(data.length==0)
           {
            if(req.body.isMail){
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(req.body.password, salt);
            try{
                let token = jwt.sign({ mobemail: req.body.mobemail }, process.env.EMAIL_SECRET);
                let mail_to_send=req.body.mobemail;
                req.body.email_verify=false;
                let url = `https://manasa-facebook-clone.herokuapp.com/confirmation/${token}`;
                let email = await db.collection("user").insertOne(req.body);
                let info = await transporter.sendMail({
                    from: gmail_user,
                    to:mail_to_send,
                    subject: "Facebook Clone SignUp",
                    text: "Click the below link to signup",
                    html: `<a href=${url}>Please Click on the URL to Register</a>`
                });
                client.close();
                res.json({message:"Email Sent to your email account. Please Verify"})
                }
                catch(error)
                {
                    if(client)
                        client.close();
                    res.json({
                        message:error
                    })    
                }
             }
             else{
                 let cursor=await db.collection("user").insertOne(req.body);
                 client.close();
                 res.json({
                     message:"SuccessFully Signed Up"
                 })
             }
           }
           else{
               client.close();
               res.json({
                   message:"Mobile Number/Email Already Exists Provide new Mobile Number/Email Address"
               })
           }
        })    
     });
    
})


app.listen(PORT, console.log(`Server is starting at ${PORT}`));