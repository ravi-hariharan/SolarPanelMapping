

function savearea()
{
	if (areacontainer[areacontainer.length-1].length>0)
	{
		document.getElementById("loginboxcontent").innerHTML='<p align="right">You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a> | <a href="#loginbox" onclick="javascript:changepassword();">Change Password</a> | <a href="#loginbox" onclick="javascript:deleteaccount();">Delete Account</a></p><hr/><h2>Save area</h2><p>Type in the name for the new area below. This is how you will identify it in the future.</p><p>Number of points='+areacontainer[areacontainer.length-1].length+'.</p><span><table><tr><td><p>Area Name</p></td><td>&nbsp;</td><td><input type="text" name="tb_areaname" id="tb_areaname" size="30" maxlength="50"></td>		  </tr>		 <tr>			<td>&nbsp;</td>			<td>&nbsp;</td><td><input type="button" name="Submit" value="Save" class="custombutton" onclick="javascript:submitsavearea();"><input type="button" name="Cancel" value="Cancel" class="custombutton" onclick="javascript:showloginmenu();"></td>		  </tr></table></span>';
	}
	else
	{
		document.getElementById("loginboxcontent").innerHTML='<p align="right">You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a> | <a href="#loginbox" onclick="javascript:changepassword();">Change Password</a> | <a href="#loginbox" onclick="javascript:deleteaccount();">Delete Account</a></p><hr/><h2>Save area</h2><p>Error! Your do not have an area drawn yet. Add some points then try again.</p><p><a href="javascript:showloginmenu();">Go Back</a></p>';	
	}
}


function togglepublic(areaid,puborpri)
{
	document.getElementById("loginboxcontent").innerHTML="<img alt='Loading' src='images/loading.gif' />";
	
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
			var response = xmlhttp.responseText;
			showloginmenu();
		}
	};
	var ran_number= Math.random()*999;
	xmlhttp.open("GET","includes/ajax/gmac-togglepublic.php?rn="+ran_number+"&areaid="+areaid+"&onoroff="+puborpri,true);
	xmlhttp.send(null);	
}


function emailarea(areaid)
{
	document.getElementById("loginboxcontent").innerHTML='<p align="right">You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a> | <a href="#loginbox" onclick="javascript:changepassword();">Change Password</a> | <a href="#loginbox" onclick="javascript:deleteaccount();">Delete Account</a></p><hr/><h2>Send Area via Email</h2><p>Type in a message and the email address to send your area to below. Your email address and username will be included in the message that is sent. You can also test this by sending an email to yourself to start with.</p><span><table border="0"><tr><td>Email Address</td><td>&nbsp;</td><td><input type="text" name="tb_emailaddress" id="tb_emailaddress" size="30" maxlength="100"></td></tr><tr><td>Message</td><td>&nbsp;</td><td><textarea name="ta_message" id="ta_message" cols="25" rows="3"></textarea></td></tr><tr><td><input name="hd_areaid" id="hd_areaid" type="hidden" value="'+areaid+'" /></td><td>&nbsp;</td><td><input type="button" name="Submit" value="Send" class="custombutton" onclick="javascript:submitsendemail();"><input type="button" name="Cancel" value="Cancel" class="custombutton" onclick="javascript:showloginmenu();"></td>\
  </tr></table></span>';
}



function submitsendemail()
{
	var emailaddress = document.getElementById('tb_emailaddress').value;
	var message = document.getElementById('ta_message').value;
	var areaid = document.getElementById('hd_areaid').value;
	
	document.getElementById("loginboxcontent").innerHTML="<img alt='Please Wait' src='images/loading.gif' />";
	
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
			var response = xmlhttp.responseText;
			showloginmenu();
			document.getElementById("loginboxcontent").innerHTML+='<p>Sent</p>';

		}
	};
	var ran_number= Math.random()*999;			
	xmlhttp.open("GET","includes/ajax/gmac-sendemail.php?rn="+ran_number+"&emailaddress="+emailaddress+"&areaid="+areaid+"&message="+message,true);
	
	console.log("includes/ajax/gmac-sendemail.php?rn="+ran_number+"&emailaddress="+emailaddress+"&areaid="+areaid+"&message="+message);
	xmlhttp.send(null);	
}

function loadarea(areaid)
{
	document.getElementById("loginboxcontent").innerHTML="<img alt='Loading' src='images/loading.gif' />";
	
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
			clearMap();
			
			//var xml = GXml.parse(xmlhttp.responseText);	
			var xml = xmlhttp.responseXML;
			
			var areaname = xml.getElementsByTagName("area")[0].getAttribute("name");
			var points = xml.documentElement.getElementsByTagName("point");
			
			for (var j = 0; j < points.length; j++) 
			{													 
				var id = points[j].getAttribute("pointid");
				var lat = points[j].getAttribute("lat");
				var lng = points[j].getAttribute("lng");
				
				var point = new google.maps.LatLng(lat,lng);
				
				//push the new point in to the last element, as the next point in that element
				areacontainer[areacontainer.length-1].push(point);
				
				//place this point as a new marker
				var marker=placeMarker(point,areacontainer[areacontainer.length-1].length);
				
				//add marker to areaMarkers array so it can be removed from the map later
				areaMarkers.push(marker);
			}
			
			//update display
			Display();
			
			areaidloaded=areaid;
			
			if (username)
			{
				showloginmenu();
			}
			else
			{
				document.getElementById("loginboxcontent").innerHTML='<p align="right"><a href="#loginbox" onclick="javascript:login();">Login</a> | <a href="#loginbox" onclick="javascript:cfa();">Create Free Account</a></p><hr/><h2>View an Area</h2><p>Area Name : '+ areaname +'</p>';
			}
			
			fitzoomandpan();
		}
	};
	var ran_number= Math.random()*999;
	xmlhttp.open("GET","includes/ajax/gmac-loadarea.php?rn="+ran_number+"&areaid="+areaid,true);
	//alert ("includes/ajax/gmac-loadarea.php?rn="+ran_number+"&areaid="+areaid);
	xmlhttp.send(null);	
}



function deletearea(areaid)
{
	document.getElementById("loginboxcontent").innerHTML="<img alt='Deleting' src='images/loading.gif' />";
	
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
			var response = xmlhttp.responseText;
			showloginmenu();
		}
	};
	var ran_number= Math.random()*999;
	xmlhttp.open("GET","includes/ajax/gmac-deletearea.php?rn="+ran_number+"&areaid="+areaid+"&username="+username,true);
	//alert ("includes/ajax/gmac-deletearea.php?rn="+ran_number+"&areaid="+areaid+"&username="+username);
	xmlhttp.send(null);	
}

function renamearea(areaid,areaname)
{	
	document.getElementById("loginboxcontent").innerHTML='<p align="right">You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a> | <a href="#loginbox" onclick="javascript:changepassword();">Change Password</a> | <a href="#loginbox" onclick="javascript:deleteaccount();">Delete Account</a></p><hr/><h2>Rename an Area</h2><p>Rename your area below.</p><span><table border="0"><tr><td>area Name</td><td><input type="text" name="tb_areaname" id="tb_areaname" size="30" maxlength="100" value="'+areaname+'"></td></tr><tr><td><input name="hd_areaid" id="hd_areaid" type="hidden" value="'+areaid+'" /></td><td><input type="button" name="Submit" value="Rename" class="custombutton" onclick="javascript:performrenamearea();"><input type="button" name="Cancel" value="Cancel" class="custombutton" onclick="javascript:showloginmenu();"></td></tr></table></span>';
}

function performrenamearea(areaid)
{
	
	var areaid=document.getElementById("hd_areaid").value;
	var areaname=document.getElementById("tb_areaname").value;
	
	document.getElementById("loginboxcontent").innerHTML="<img alt='Renaming' src='images/loading.gif' />";
	
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
			var response = xmlhttp.responseText;
			showloginmenu();
		}
	};
	var ran_number= Math.random()*999;
	xmlhttp.open("GET","includes/ajax/gmac-renamearea.php?rn="+ran_number+"&areaid="+areaid+"&areaname="+areaname,true);
	xmlhttp.send(null);	
}

function addareanotes(areaid,areaname,areanotes)
{	
	var re = '/\+/g';
	document.getElementById("loginboxcontent").innerHTML='<p align="right">You are logged in as '+username+' | <a href="#" onclick="logout();">Logout</a> | <a href="#loginbox" onclick="javascript:changepassword();">Change Password</a> | <a href="#loginbox" onclick="javascript:deleteaccount();">Delete Account</a></p><hr/>\
		<h2>Add Notes To an Area</h2><p>You can add various notes to your area below.</p>\
<span>\
<table border="0">\
  <tr>\
    <td colspan="3"><p>Area Name ['+areaname+']</p></td>\
  </tr>\
   <tr>\
    <td><p>Notes</p></td>\
	<td>&nbsp;</td>\
    <td><textarea name="ta_notes" id="ta_notes" cols="40" rows="6">'+decodeURI(areanotes.replace(re," ").replace(/%2B/g,"+"))+'</textarea></td>\
  </tr>\
  <tr>\
    <td><input name="hd_areaid" id="hd_areaid" type="hidden" value="'+areaid+'" /></td>\
	<td>&nbsp;</td>\
    <td align="right"><input type="button" name="Submit" value="Save" class="custombutton" onclick="javascript:performsavenotes();">\
	<input type="button" name="Cancel" value="Cancel" class="custombutton" onclick="javascript:showloginmenu();"></td>\
  </tr>\
</table>\
</span>';
}

function performsavenotes()
{
	
	var areaid=document.getElementById("hd_areaid").value;
	var notes=encodeURI(document.getElementById("ta_notes").value);
	var re = '/\+/g';
	notes=notes.replace(re,"%2B");
	document.getElementById("loginboxcontent").innerHTML="<img alt='Renaming' src='images/loading.gif' />";
	
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
			var response = xmlhttp.responseText;
			showloginmenu();
		}
	};
	var ran_number= Math.random()*999;
	xmlhttp.open("GET","includes/ajax/gmac-updatenotes.php?rn="+ran_number+"&areaid="+areaid+"&notes="+notes,true);
	
	xmlhttp.send(null);	
}

function fitzoomandpan()
{
	var latlngbounds = new google.maps.LatLngBounds();
	
	for(var j=0;j<areacontainer.length;++j)
	{
		for(var i=0;i<areacontainer[j].length;++i)
		{
			latlngbounds.extend(areacontainer[j][i]);
		}
	}
	map.setCenter(latlngbounds.getCenter());
	map.fitBounds(latlngbounds);
}

function ftn_zoomtofit()
{
	fitzoomandpan();
}

