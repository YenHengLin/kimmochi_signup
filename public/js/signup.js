'use strict';
var account=document.querySelector('#account');
var password=document.querySelector('#password');
var email=document.querySelector('#email');
var button1=document.querySelector('#submit');
var verify_c=document.querySelector('#verify_c');
var button2=document.querySelector('#verify_b');
var verify_m=document.querySelector('#verify_m');
var randomnumber=[];


function random(){
  var i;
  for(i=0;i<4;i++){
    randomnumber[i]=Math.floor(Math.random()*10);
  }
  
}
button1.onclick=function(){
  random();
  //password.value=randomnumber[0]+randomnumber[1];
  
  //send data to mongodb
  $.ajax({
    type:"POST",
    url:"/identify",
    data:
    {
      account:account.value,
      password:password.value,
      email:email.value,
      randomnumber:randomnumber

    },
    success:function(data){
      $("#success1").text(data);

    },
    error:function(){
      $("#success1").text("send error");
    }
    

  });
  //alert(JSON.stringify(canvas.toDataURL()));
  
}
button2.onclick=function(){
  var usernumber=verify_c.value;
  if(usernumber[0]==randomnumber[0]&&
     usernumber[1]==randomnumber[1]&&
     usernumber[2]==randomnumber[2]&&
     usernumber[3]==randomnumber[3] ){
  $.ajax({
    type:"POST",
    url:"/check",
    data:
    {
     verify_c:verify_c.value,

    },
    success:function(data){
      $("#verify_m").text(data);

    },
    error:function(){
      $("#verify_m").text("send error");
    }
    

  });
 }
}
