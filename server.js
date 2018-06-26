const express = require('express');
const app = express();
const port_express = 1200;
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}));

var fs=require('fs');
//指向 public/takepicture.html
console.log(__dirname);
app.use(express.static(__dirname + '/public'));
//listen port
app.listen(port_express, function () {
  console.log('Example app listening on port ' + port_express + ' !');
});
//MongoDB
//URL, may change due to different server
const db_url = 'mongodb://uidd2018_groupH:71222217@luffy.ee.ncku.edu.tw/uidd2018_groupH';
const db_name = 'uidd2018_groupH';
const db_col = 'Messages';
//import mongodb
var MongoClient = require('mongodb').MongoClient;


//use gmail send verification email
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host:'imap.gmail.com',	
  service: 'gmail',
  security: true,
  port: 993,	
  auth: {
    user: '',
    pass: ''
  }
});



 

//set gmail end

var account;
var password;
var email;
var randomnumber;
//Test DB connection
app.post("/identify", function(req,res){
  account=req.body.account;
  password=req.body.password;
  email=req.body.email;
  randomnumber=req.body.randomnumber;
  //send randomnumber
  var mailOptions = {
    from: '',
    to: email,
    subject: '茶水表咯，你要的認證信',
    text: randomnumber[0]+randomnumber[1]+randomnumber[2]+randomnumber[3] 
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
app.post("/check", function (req, res) {
    //console.log("yes");
   // console.log(req.body.picture);
   
    
    MongoClient.connect(db_url, function (err, client) {
      const db = client.db(db_name);
      const col = db.collection('User');
      //console.log(req.body.picture);
      
      if (err) console.log(err);
      col.insertOne({
        
        name: account,
        password:password
    
      });
      client.close();
    });
    res.send("verify success");
  });
  


