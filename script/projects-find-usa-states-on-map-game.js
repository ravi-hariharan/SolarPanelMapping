var map;
var geocoder;
var statetofind;
var statesstofind= new Array();
var currentq=0;
var score=0;
var marker;
var kmlLayer;
var kmlurl="http://www.daftlogic.com/kmz-files/usastateborders.kmz";
var borderson=false;

function initialize() 
{
	var latlng = new google.maps.LatLng(39.828175,-98.5795);
	var myOptions = {zoom:4,center:latlng,mapTypeId:google.maps.MapTypeId.SATELLITE,draggableCursor:'crosshair',mapTypeControl:false};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	geocoder = new google.maps.Geocoder(); 
	loadstates();
}
//****************************************************
function isset(varname)
{
	return(typeof(window[varname])!='undefined');
}
//****************************************************
function loadstates()
{
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
			var xmlDoc = xmlhttp.responseXML;
          	// obtain the array of markers and loop through it
         	var markers = xmlDoc.documentElement.getElementsByTagName("state");
          	for (var i = 0; i < markers.length; i++) 
		  	{
            	// obtain the attribues of each country
            	var id = parseFloat(markers[i].getAttribute("id"));
            	var name  = markers[i].getAttribute("name");
				//build up the array
				statesstofind.push(name);
          	}
			nextq();
		}
	};
	var ran_number= Math.random()*9999;
	xmlhttp.open("GET","includes/ajax/getstates.php?&rn="+ran_number,true);
	xmlhttp.send(null);	
}
//****************************************************		
function nextq()
{
	//Next Question
	currentq=currentq+1;
	var textscore="Your Score = "+score;
	if (statesstofind.length>=1)
	{
		statetofind=statesstofind.pop();
		var	texttodisplay=textscore+" : Q"+currentq+") Click on the map where you think "+statetofind+" is.";
		document.getElementById("message").innerHTML="<p align='center' style='color:#FF0000'>"+texttodisplay+"</p>";
			
		google.maps.event.addListener(map, 'click', function(event)
		{										  
			geocoder.geocode({'latLng': event.latLng}, function(results, status) 
			{
				
				var texttodisplay;
				var gameover;
			
				if (status != google.maps.GeocoderStatus.OK) 
		  		{
					texttodisplay="Q"+currentq+") Try again to find "+statetofind;
				} 
				else 
				{
					var cname="";					
					try
					{
						for (var j=0;j<results[0].address_components.length;j++)
						{
							var xty=results[0].address_components[j].types;	
							if (xty.indexOf('administrative_area_level_1')!=-1)
							{
								cname=results[0].address_components[j].long_name;
								//alert (cname);
							}
						}					
					}
					catch(err)
					{
						//document.getElementById("message").innerHTML="<p align='center' style='color:#FF0000'>Last Country: [none]</p>";
					}

					
					if (cname=="")
					{
						texttodisplay="Try again to find "+statetofind;
						currentq=currentq-1;
					}
					else
					{
						if (cname==statetofind)
						{
							texttodisplay="Q"+currentq+") Correct!";
							google.maps.event.clearListeners(map, "click");
							gameover=false;
							updatetotals(statetofind,1);
							score=score+1;
						}
						else
						{
							texttodisplay="Wrong! You Scored "+score;
							//alert (cname);
							google.maps.event.clearListeners(map, "click");
							updatetotals(statetofind,-1);
							gameover=true;
						}
					}
				}
		
				document.getElementById("message").innerHTML="<p align='center' style='color:#FF0000'>"+texttodisplay+"</p>";
				if (gameover==false)
				{
					nextq();
				}
				else
				{
					showgimmeyourname();
				}
			});
			
			if (marker) 
			{
				marker.setMap(null);
			}
			marker=placeMarker(event.latLng);
			marker.setMap(map);
 		});
	}
	else
	{
		var	texttodisplay="Game Completed! "+textscore;
		document.getElementById("message").innerHTML="<p align='center' style='color:#FF0000'>"+texttodisplay+"</p>";
		showgimmeyourname();
	}
}

function placeMarker(location) 
{
	var image = new google.maps.MarkerImage('https://www.daftlogic.com/images/gmmarkersv3/stripes.png',
	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(20, 34),
	// The origin for this image is 0,0.
	new google.maps.Point(0,0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(9, 33));

	var marker = new google.maps.Marker({position:location,map:map,icon:image,draggable:false});

	return marker;
}
//****************************************************
function savename()
{
	var namefield = document.getElementById('name');
	var name=namefield.value;
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
			document.getElementById("submitname").innerHTML="<p align='center'>Saved! <a href='javascript:window.location.reload()'>Refresh this page</a> to see your name on the Find Country on Map <a href='#highscores'>highscore list</a>.</p><br/>";
		}
	};
	var ran_number= Math.random()*5000;
	xmlhttp.open("GET","includes/ajax/savehighscorestate.php?rn="+ran_number+"&name="+name+"&score="+score+"&borderson="+borderson,true);
	//alert ("includes/ajax/savehighscorestate.php?rn="+ran_number+"&name="+name+"&score="+score+"&borderson="+borderson);
	xmlhttp.send(null);	
}
//****************************************************
function showgimmeyourname()
{
	document.getElementById("submitname").innerHTML="<p align='center'>Add your name to the high score list <input name='name' id='name' type='text' size='16' maxlength='50'><input type='button' name='hsbtn' value='Save' onclick='savename()'></p><br/>";
}
//****************************************************
function updatetotals(currentstate,adder)
{
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
			//Do Nothing
		}
	};
	var ran_number= Math.random()*5000;
	xmlhttp.open("GET","includes/ajax/updatestatetotals.php?rn="+ran_number+"&state="+currentstate+"&adder="+adder,true);
	xmlhttp.send(null);	
}
//****************************************************

function resetgame()
{
	statetofind="";
	document.getElementById("submitname").innerHTML="";
	do
	{
		statesstofind.pop();
	} while(statesstofind.length>=1);
	currentq=0;
	score=0;
	
	if (marker) 
	{
		marker.setMap(null);
	}
			
	var latlng = new google.maps.LatLng(39.828175,-98.5795);		
	map.setCenter(latlng);
	map.setZoom(4);
	
	loadstates();
}

function loadborders()
{
	if (!borderson)
	{
		kmlLayer = new google.maps.KmlLayer({url: kmlurl,map:map,suppressInfoWindows:false,preserveViewport:true});	
	}
	borderson=true;
}