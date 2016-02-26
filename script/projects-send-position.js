var map;
var marker=null;
var GeoMarker;
var findmeControlDiv;

function initialize() 
{	
	var latlng = new google.maps.LatLng(40,0);
	var myOptions = {zoom:1,center:latlng,mapTypeId:google.maps.MapTypeId.ROADMAP,draggableCursor:'crosshair',mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU}};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	
	document.getElementById("info").innerHTML="<p>Please click to place a new marker.</p>";
	
	google.maps.event.addListener(map, 'zoom_changed', function()
	{	
		encodeurl();
		
	});
	
	google.maps.event.addListener(map, 'maptypeid_changed', function()
	{	
		encodeurl();
		
	});
	
	google.maps.event.addListener(map, 'dragend', function()
	{	
		encodeurl();
		
	});
		
	google.maps.event.addListener(map, 'click', function(event)
	{
		
		if (marker) 
		{
			marker.setMap(null);
		}
		
		marker=placeMarker(event.latLng);
		marker.setMap(map);
			
		encodeurl();
		 
 	});
	
	
	var input =  document.getElementById('pac-input');
  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	autocomplete = new google.maps.places.Autocomplete(input);
	
	google.maps.event.addListener(autocomplete, 'place_changed', function() 
	{
		var place = autocomplete.getPlace();
    	if (!place.geometry) 
		{
      		return;
    	}

		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) 
		{
			map.fitBounds(place.geometry.viewport);
		}
		else 
		{
			map.setCenter(place.geometry.location);
			map.setZoom(17);  // Why 17? Because it looks good.
		} 
  });
  
  	// Create the DIV to hold the control and call the HomeControl() constructor
  	// passing in this DIV.
  	findmeControlDiv = document.createElement('DIV');
  	var findmeControl = new FindMeControl(findmeControlDiv, map);
  	findmeControlDiv.index = 1;
  	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(findmeControlDiv);
	
	if (!(typeof input_mapzoom === 'undefined'))
	{
		map.setZoom(input_mapzoom);	
	}
	
	if (!(typeof input_mapcentre === 'undefined')) 
	{
		map.setCenter(input_mapcentre);	
	}
	
	if (!(typeof input_maptype === 'undefined')) 
	{
		map.setMapTypeId(input_maptype);	
	}
	
	if ((!(typeof input_markerlat === 'undefined')) && (!(typeof input_markerlng === 'undefined')) )
	{
		if ((input_markerlat!="-1")&&(input_markerlng!="-1"))
		{
			if (marker) 
			{
				marker.setMap(null);
			}
			var latlng = new google.maps.LatLng(input_markerlat,input_markerlng);
			marker=placeMarker(latlng);
			marker.setMap(map);
		}
	}
}

function encodeurl()
{
	var mapzoom=map.getZoom();
	var mapcenter=map.getCenter();
	var maplat=mapcenter.lat();
	var maplng=mapcenter.lng();
	var maptype=map.getMapTypeId();
	
	var markerlat;
	var markerlng;
	
	if (marker) 
	{
		var markercenter=marker.getPosition();
		markerlat=markercenter.lat();
		markerlng=markercenter.lng();
	}
	else
	{
		markerlat="-1";
		markerlng="-1";
	}
	
	var urltoencode="url=http://www.daftlogic.com/projects-send-position-"+maplat+"_"+maplng+"_"+mapzoom+"_"+maptype+"_"+markerlat+"_"+markerlng+".htm";
	findtinyurl(urltoencode);
}


function findtinyurl(params)
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
			//response
			var tinyurl = xmlhttp.responseText;
			//alert (tinyurl);
			
			document.getElementById("info").innerHTML="<p>Use : <a href='"+tinyurl+"' target='_blank'>"+tinyurl+"</a><form action='http://tinyurl.com/create.php' method='post' target='_blank'></p>"			
		}
	};
		
	xmlhttp.open("POST","includes/ajax/generate-tinyurl.php",true);
	//Send the proper header information along with the request
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");

	xmlhttp.send(params);
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
	
	var marker = new google.maps.Marker({position:location,map:map,icon:image});
	
	return marker;
}

function FindMeControl(controlDiv, map) {

  // Set CSS styles for the DIV containing the control
  // Setting padding to 5 px will offset the control
  // from the edge of the map
  controlDiv.style.padding = '5px';

  // Set CSS for the control border
  var controlUI = document.createElement('DIV1');
  controlUI.style.backgroundColor = 'white';
  controlUI.style.borderStyle = 'solid';
  controlUI.style.borderWidth = '2px';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to Pan to Your Location';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('DIV2');
  controlText.style.fontFamily = 'Arial,sans-serif';
  controlText.style.fontSize = '12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = 'Pan to My Location';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago
  google.maps.event.addDomListener(controlUI, 'click', function() {
	gotomylocation();
  });
}

function gotomylocation()
{
	if (!(GeoMarker==undefined)) 
	{
		if (!(GeoMarker.getMap()==null))
		{
			GeoMarker.setMap(null);
			findmeControlDiv.childNodes[0].childNodes[0].innerHTML="Pan to My Location";
		}
		else
		{
			GeoMarker=null;
			gotomylocation();
		}
	}
	else
	{
		findmeControlDiv.childNodes[0].childNodes[0].innerHTML="Please Wait...";
		GeoMarker = new GeolocationMarker(map);
		GeoMarker.setCircleOptions({fillColor: '#808080'});

		google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
		    map.setCenter(this.getPosition());
		    map.fitBounds(this.getBounds());
		    findmeControlDiv.childNodes[0].childNodes[0].innerHTML="Disable My Location";
		});

		google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
		 if (logging){console.log('DCM - There was an error obtaining your position. Message: ' + e.message);}
		  	findmeControlDiv.childNodes[0].childNodes[0].innerHTML="Cant Find";
		});
	}
}