// JavaScript Document
var geocoder = null;
function searchlocation(searchstring) 
{
	//latLng 
	//^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$

  	if (/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?$)/.test(searchstring)) 
	{
		console.log("latLng");
		//successful match
		var latlng = new google.maps.LatLng(searchstring.split(",")[0],searchstring.split(",")[1]);
		geocoder.geocode( { 'latLng': latlng}, function(results, status) 
		{
			if (status == google.maps.GeocoderStatus.OK) 
			{
				map.setCenter(results[0].geometry.location);
				map.fitBounds(results[0].geometry.viewport);  	
			} 
			else 
			{
				//alert("Geocode was not successful for the following reason: " + status);
			}
		});
		
	}
	else
	{
		geocoder.geocode( { 'address': searchstring}, function(results, status) 
		{
			if (status == google.maps.GeocoderStatus.OK) 
			{
				map.setCenter(results[0].geometry.location);
				map.fitBounds(results[0].geometry.viewport);  	
			} 
			else 
			{
				//alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}
}

function setSelectedIndex(s, valsearch)
{
	// Loop through all the items in drop down list
	for (i = 0; i< s.options.length; i++)
	{ 
		if (s.options[i].value == valsearch)
		{
			// Item is found. Set its property and exit
			s.options[i].selected = true;
			break;
		}
	}
	return;
}