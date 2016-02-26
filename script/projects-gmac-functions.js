// JavaScript Document

//Globals
var myPic = new Image(32,32);
var username;
var areaidloaded=null;
myPic.src = "images/loading.gif";

var str_loginboxbasichtml='<p align="right"><a href="#loginbox" onclick="javascript:login();">Login</a> | <a href="#loginbox" onclick="javascript:cfa();">Create Free Account</a></p>';

//Functions
function isValidEmailOLD(str) 
{
   return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
}

function isValidEmail(string) {
if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
return true;
else
return false;
}