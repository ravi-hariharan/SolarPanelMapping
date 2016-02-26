// JavaScript Document

function submitsavearea()
{
	//name for the area
	var areaname = document.getElementById('tb_areaname').value;
	//should the area be public?
	//var makepublic = document.getElementById('cb_makepublic').checked;
	var makepublic=false;
	//Check there is a name for the area
	if(areaname=="")
	{
		document.getElementById("loginboxcontent").innerHTML='<p>You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a></p><hr/>\
		<h2>Save area</h2>\
		<p>Error! Your area has no name.</p>\
		<p><a href="javascript:savearea();">Go Back</a></p>';	
		return;
	}

	if (makepublic==true)
	{
		makepublic=1;
	}
	else
	{
		makepublic=0;
	}
		
	document.getElementById("loginboxcontent").innerHTML="<img alt='Please Wait' src='images/loading.gif' />";
	
	var pointsxml="";
	
	for(var j=0;j<areacontainer[areacontainer.length-1].length;++j)
	{
		var lat=areacontainer[areacontainer.length-1][j].lat();
		var lng=areacontainer[areacontainer.length-1][j].lng();
		pointsxml+=lat+","+lng+"|";
	}
	
	//Create a boolean variable to check for a valid MS instance.
	var xmlhttp = false;
	//Check if we are using IE.
	try 
	{
		//If the javascript version is greater than 5.
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (e) 
	{
		//If not, then use the older active x object.
		try 
		{
			//If we are using IE.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E)
		{
			//Else we must be using a non-IE browser.
			xmlhttp = false;
		}
	}
	
	//If we are using a non-IE browser, create a javascript instance of the object.
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') 
	{
		xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState==4)
		{
			//response
			var newareaid = xmlhttp.responseText;
			//newareaid is the new area id
			
			//to finish
			showloginmenu();
			document.getElementById("loginboxcontent").innerHTML+='<p>Saved</p>';
		}
	};
	
	var ran_number=Math.floor(Math.random()*999);			
	xmlhttp.open("POST","includes/ajax/gmac-savearea.php",true);
	var params="rn="+ran_number+"&username="+username+"&areaname="+areaname+"&pointsxml="+pointsxml+"&makepublic="+makepublic;
	//alert (params);
	//Send the proper header information along with the request
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	
	xmlhttp.send(params);
}

function saveexistingarea()
{
	//name for the area
	var areaid = areaidloaded;

	//Check there is a name for the area
	if(areaid=="")
	{
		document.getElementById("loginboxcontent").innerHTML='<p>You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a> | <a href="#loginbox" onclick="javascript:changepassword();">Change Password</a> | <a href="#loginbox" onclick="javascript:deleteaccount();">Delete Account</a></p><hr/>\
		<h2>Save area</h2>\
		<p>Error! Your area is not found.</p>\
		<p><a href="javascript:showloginmenu();">Go Back</a></p>';	
		return;
	}
		
	document.getElementById("loginboxcontent").innerHTML="<img alt='Please Wait' src='images/loading.gif' />";
	
	var pointsxml="";
	
	for(var j=0;j<areacontainer[areacontainer.length-1].length;++j)
	{
		var lat=areacontainer[areacontainer.length-1][j].lat();
		var lng=areacontainer[areacontainer.length-1][j].lng();
		pointsxml+=lat+","+lng+"|";
	}
	
	//Create a boolean variable to check for a valid MS instance.
	var xmlhttp = false;
	//Check if we are using IE.
	try 
	{
		//If the javascript version is greater than 5.
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (e) 
	{
		//If not, then use the older active x object.
		try 
		{
			//If we are using IE.
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E)
		{
			//Else we must be using a non-IE browser.
			xmlhttp = false;
		}
	}
	
	//If we are using a non-IE browser, create a javascript instance of the object.
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') 
	{
		xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState==4)
		{
			//response
			var newareaid = xmlhttp.responseText;
			//newareaid is the new area id
			
			//to finish
			showloginmenu();
			document.getElementById("loginboxcontent").innerHTML+='<p>Saved</p>';
		}
	};
	
	var ran_number=Math.floor(Math.random()*999);			
	xmlhttp.open("POST","includes/ajax/gmac-resavearea.php",true);
	var params="rn="+ran_number+"&areaid="+areaid+"&pointsxml="+pointsxml;
	//Send the proper header information along with the request
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send(params);
}

function makekml(areaid)
{
	
	var xmlHttp;
	
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4)
		{
			var linktext="<a href='downloads/kml/"+xmlHttp.responseText+"'>Download KML</a>";
			
			var div_kmloutput=document.getElementById(areaid);
			div_kmloutput.style.visibility='visible';
			
			div_kmloutput.innerHTML=linktext;
			//var resetbuttontext="<input name='button' type='button' onclick='Reset();' value='Start Again'/>";
			//document.getElementById("buttoncell").innerHTML=resetbuttontext;
		}
	};
	var randomnumber=Math.floor(Math.random()*9999);

	var params;
	params="rand="+randomnumber;
	params+="&areaid="+areaid;
	
	xmlHttp.open("POST","includes/ajax/agmdc3-makekml.php",true);

	//Send the proper header information along with the request
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", params.length);
	xmlHttp.setRequestHeader("Connection", "close");

	xmlHttp.send(params);	
}